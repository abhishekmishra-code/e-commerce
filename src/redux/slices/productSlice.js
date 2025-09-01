import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dbService from "../../appwrite/databaseService";
import storageService from "../../appwrite/storageService";
import config from "../../config/config";

// Only store image URLs (string) in Appwrite!
const normalizeImages = async (images = []) => {
  const result = [];
  for (const img of images) {
    if (img instanceof File) {
      const uploaded = await storageService.uploadFile(img);
      const preview = storageService.getFilePreview(uploaded.$id);
      const previewUrl =
        `${config.appwriteEndpoint}/storage/buckets/${config.appwriteBucketId}/files/${uploaded.$id}/view?project=${config.appwriteProjectId}`;
      console.log("FileId:", uploaded.$id, "Preview URL:", previewUrl);
      result.push(previewUrl); // Should be a string URL
    } else if (typeof img === "string") {
      result.push(img);
    } else if (img && img.url) {
      result.push(img.url);
    }
  }
  return result;
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const queries = [];
      if (filters.categoryId)
        queries.push(Query.equal("categoryId", filters.categoryId));
      if (filters.limit) queries.push(Query.limit(filters.limit));
      const response = await dbService.getProducts(queries);
      return response.documents;
    } catch (error) {
      return rejectWithValue(error.message || "Unable to fetch products");
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      return await dbService.getProductById(productId);
    } catch (error) {
      return rejectWithValue(error.message || "Product not found");
    }
  },
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue, dispatch }) => {
    const tempId = `temp-${Date.now()}`;
    dispatch(
      productSlice.actions.addOptimisticProduct({ ...formData, $id: tempId }),
    );

    try {
      const uploadedImages = await normalizeImages(formData.images || []);
      const stringifyCustomAttributes = (arr) =>
        Array.isArray(arr)
          ? arr.map((attr) =>
              typeof attr === "object" ? JSON.stringify(attr) : attr,
            )
          : [];
      // Only include keys present in your schema!
      const { images, customAttributes, existingImageUrls, ...otherFields } =
        formData;
      const newProductData = {
        ...otherFields,
        images: [...(existingImageUrls || []), ...uploadedImages],
        customAttributes: stringifyCustomAttributes(customAttributes),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const created = await dbService.createProduct(newProductData);
      return { tempId, product: created };
    } catch (err) {
      dispatch(productSlice.actions.removeProduct(tempId));
      return rejectWithValue(err.message || "Product creation failed!");
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData, existingProduct }, { rejectWithValue, dispatch }) => {
    dispatch(productSlice.actions.mergeProduct({ $id: id, ...formData }));
    try {
      const stringifyCustomAttributes = (arr) =>
        Array.isArray(arr) ? arr.map(attr => typeof attr === "object" ? JSON.stringify(attr) : attr) : [];
      // keep only images whose URL is in existingImageUrls
      const keptImages = (existingProduct.images || []).filter((url) =>
        (formData.existingImageUrls || []).includes(url),
      );
      const newImages = await normalizeImages(formData.images || []);
      // Only include schema keys
      const { images, customAttributes, existingImageUrls, ...otherFields } = formData;
      const updated = await dbService.updateProduct(id, {
        ...otherFields,
        images: [...keptImages, ...newImages],
        customAttributes: stringifyCustomAttributes(customAttributes),
        updatedAt: new Date().toISOString(),
      });
      return updated;
    } catch (err) {
      return rejectWithValue(err.message || "Product update failed!");
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id }, { rejectWithValue, dispatch }) => {
    dispatch(productSlice.actions.removeProduct(id));
    try {
      await dbService.deleteProduct(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Product deletion failed!");
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    currentProduct: null,
    status: "idle",
    error: null,
  },
  reducers: {
    addOptimisticProduct: (state, action) => {
      state.items.unshift(action.payload);
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((p) => p.$id !== action.payload);
    },
    mergeProduct: (state, action) => {
      const index = state.items.findIndex((p) => p.$id === action.payload.$id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items = state.items.map((p) =>
          p.$id === action.payload.tempId ? action.payload.product : p,
        );
        state.status = "succeeded";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p.$id === action.payload.$id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addOptimisticProduct, removeProduct, mergeProduct } =
  productSlice.actions;
export default productSlice.reducer;

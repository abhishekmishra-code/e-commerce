import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../../redux/slices/productSlice";
import { useToast } from "../../hooks/use-toast";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  mrp: z.number().min(0, "MRP must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  sku: z.string().min(1, "SKU is required"),
  stock: z.number().min(0, "Stock must be non-negative"),
  status: z.enum(["published", "draft", "archived"]),
});

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "wearables", label: "Wearables" },
  { value: "audio", label: "Audio" },
  { value: "computers", label: "Computers" },
  { value: "gaming", label: "Gaming" },
];

export function ProductForm({ product, onCancel, isLoading }) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [tags, setTags] = useState(product?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [customAttributes, setCustomAttributes] = useState([]);
  const [attributeKey, setAttributeKey] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  // Images: File[] for new files; strings (URLs) for existing ones
  const [images, setImages] = useState([]); // new uploads
  const [existingImages, setExistingImages] = useState([]); // URL strings from Appwrite
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (!product) return;

    // Ensure images is a proper array
    setExistingImages(Array.isArray(product?.images) ? product.images : []);

    // Safely parse customAttributes if available and valid
    if (
      Array.isArray(product.customAttributes) &&
      product.customAttributes[0]
    ) {
      const parsedAttributes = JSON.parse(product.customAttributes[0]);
      setCustomAttributes([parsedAttributes]);
    }
  }, [product]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      mrp: product?.mrp || 0,
      categoryId: product?.categoryId || "",
      brand: product?.brand || "",
      sku: product?.sku || "",
      stock: product?.stock || 0,
      status: product?.status || "draft",
    },
  });

  const watchPrice = watch("price");
  const watchMrp = watch("mrp");

  useEffect(() => {
    if (watchPrice > watchMrp && watchMrp > 0) {
      setValue("mrp", watchPrice);
    }
  }, [watchPrice, watchMrp, setValue]);

  // TAG METHODS
  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // CUSTOM ATTRIBUTES
  const addCustomAttribute = () => {
    const trimmedKey = attributeKey.trim();
    const trimmedValue = attributeValue.trim();
    if (trimmedKey && trimmedValue) {
      const existingIndex = customAttributes.findIndex(
        (attr) => attr.key === trimmedKey,
      );
      if (existingIndex >= 0) {
        const updated = [...customAttributes];
        updated[existingIndex] = { key: trimmedKey, value: trimmedValue };
        setCustomAttributes(updated);
      } else {
        setCustomAttributes([
          ...customAttributes,
          { key: trimmedKey, value: trimmedValue },
        ]);
      }
      setAttributeKey("");
      setAttributeValue("");
    }
  };
  const removeCustomAttribute = (keyToRemove) => {
    setCustomAttributes(
      customAttributes.filter((attr) => attr.key !== keyToRemove),
    );
  };

  // IMAGE HANDLING
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
  };
  const removeNewImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const removeExistingImage = (url) => {
    setExistingImages(existingImages.filter((_url) => _url !== url));
  };

  // SUBMIT
  const onSubmit = (data) => {
    if (data.price > data.mrp) {
      setFormError("Price cannot be higher than MRP");
      return;
    }
    const formData = {
      ...data,
      tags,
      customAttributes,
      images, // new images (File[])
      existingImageUrls: existingImages, // <- just URLs!
    };

    if (product?.$id) {
      dispatch(
        updateProduct({ id: product.$id, formData, existingProduct: product }),
      );
    } else {
      dispatch(createProduct(formData));
    }

    toast({
      title: "Success",
      description: `Product ${product ? "updated" : "created"} successfully`,
    });

    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {formError && (
        <div className="bg-destructive/10 text-destructive rounded-lg p-4">
          {formError}
        </div>
      )}

      {/* BASIC INFO */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Basic Information</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label>Product Name *</Label>
            <Input {...register("name")} placeholder="Enter product name" />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label>SKU *</Label>
            <Input
              {...register("sku")}
              placeholder="Enter SKU"
              className="font-mono"
            />
            {errors.sku && (
              <p className="text-destructive text-sm">{errors.sku.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Enter description"
              rows={3}
            />
          </div>
          <div>
            <Label>Brand</Label>
            <Input {...register("brand")} placeholder="Enter brand name" />
          </div>
          <div>
            <Label>Category *</Label>
            <Select
              onValueChange={(value) => setValue("categoryId", value)}
              defaultValue={product?.categoryId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-destructive text-sm">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* PRICING */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Pricing & Inventory</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <Label>Price *</Label>
            <Input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-destructive text-sm">{errors.price.message}</p>
            )}
          </div>
          <div>
            <Label>MRP *</Label>
            <Input
              type="number"
              step="0.01"
              {...register("mrp", { valueAsNumber: true })}
            />
            {errors.mrp && (
              <p className="text-destructive text-sm">{errors.mrp.message}</p>
            )}
          </div>
          <div>
            <Label>Stock *</Label>
            <Input
              type="number"
              {...register("stock", { valueAsNumber: true })}
            />
            {errors.stock && (
              <p className="text-destructive text-sm">{errors.stock.message}</p>
            )}
          </div>
        </div>
      </Card>

      {/* IMAGES */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Product Images</h3>
        <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {existingImages.map((url, idx) => (
            <div key={`${url}-${idx}`} className="group relative">
              <img
                src={url}
                alt="Product"
                className="h-32 w-full rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeExistingImage(url)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
              >
                <X size={16} />
              </Button>
            </div>
          ))}
          {images.map((file, idx) => (
            <div key={idx} className="group relative">
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="h-32 w-full rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeNewImage(idx)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Card>

      {/* TAGS */}
      <Card className="p-6">
        <h3 className="mb-2 text-lg font-semibold">Tags</h3>
        <div className="mb-2 flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
          />
          <Button type="button" onClick={addTag} variant="outline">
            <Plus size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center space-x-1"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-destructive ml-1"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
      </Card>

      {/* CUSTOM ATTRIBUTES */}
      <Card className="p-6">
        <h3 className="mb-2 text-lg font-semibold">Custom Attributes</h3>
        <div className="mb-2 grid grid-cols-2 gap-2">
          <Input
            value={attributeKey}
            onChange={(e) => setAttributeKey(e.target.value)}
            placeholder="Attribute name"
          />
          <div className="flex gap-2">
            <Input
              value={attributeValue}
              onChange={(e) => setAttributeValue(e.target.value)}
              placeholder="Attribute value"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addCustomAttribute())
              }
            />
            <Button
              type="button"
              onClick={addCustomAttribute}
              variant="outline"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
        {customAttributes.map((attr, id) => (
          <div
            key={`${attr.key}-${id}`}
            className="bg-muted mb-1 flex justify-between rounded p-2"
          >
            <span>
              {attr.key}: {attr.value}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeCustomAttribute(attr.key)}
            >
              <X size={14} />
            </Button>
          </div>
        ))}
      </Card>

      {/* STATUS */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Status</h3>
        <Select
          onValueChange={(value) => setValue("status", value)}
          defaultValue={product?.status}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-destructive mt-2 text-sm">
            {errors.status.message}
          </p>
        )}
      </Card>

      <div className="flex justify-end gap-4 pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </form>
  );
}

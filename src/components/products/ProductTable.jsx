import { Edit, Trash2, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

const statusColors = {
  published: "bg-success text-success-foreground",
  draft: "bg-warning text-warning-foreground",
  archived: "bg-muted text-muted-foreground",
};

export function ProductTable({ products, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
              <Skeleton className="h-8 w-[80px]" />
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-8 w-[100px]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-muted-foreground h-24 text-center">
                No products found.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.$id} className="hover:bg-muted/20 transition-colors">
                <TableCell>
                  <div className="bg-muted h-12 w-12 overflow-hidden rounded-lg">
                    {Array.isArray(product.images) && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt="Product"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Eye className="text-muted-foreground h-4 w-4" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-foreground font-medium">{product.name}</div>
                    {product.brand && (
                      <div className="text-muted-foreground text-sm">{product.brand}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">₹{product.price}</span>
                    {product.mrp !== product.price && (
                      <span className="text-muted-foreground text-sm line-through">
                        ₹{product.mrp}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={product.stock === 0 ? "text-destructive font-medium" : ""}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[product.status]}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                    name='edit'
                    title="Edit Product"
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                    name='delete'
                    title="Delete Product"
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(product)}
                      className="text-destructive hover:text-destructive h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

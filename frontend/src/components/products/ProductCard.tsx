import { useState } from 'react';
import type { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { ProductDialog } from './ProductDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400?text=No+Image';
            }}
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            <Badge variant={product.quantity > 0 ? 'default' : 'destructive'}>
              {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <p className="text-sm">Quantity: {product.quantity}</p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      <ProductDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        mode="edit"
        product={product}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        product={product}
      />
    </>
  );
}

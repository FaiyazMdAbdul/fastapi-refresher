import type { Product } from '@/types/product';
import { ProductForm } from './ProductForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts';
import type { ProductFormData } from '@/lib/validators';

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  product?: Product;
}

export function ProductDialog({ isOpen, onClose, mode, product }: ProductDialogProps) {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(data);
      } else if (product) {
        await updateMutation.mutateAsync({ ...data, id: product.id });
      }
      onClose();
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Product' : 'Edit Product'}
          </DialogTitle>
        </DialogHeader>
        <ProductForm
          defaultValues={product}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}

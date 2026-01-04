import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductFormData } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProductFormProps {
  defaultValues?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
}

export function ProductForm({ defaultValues, onSubmit, isLoading }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues || {
      name: '',
      price: 0,
      description: '',
      quantity: 0,
      image: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register('name')} placeholder="Product name" />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          placeholder="0.00"
        />
        {errors.price && (
          <p className="text-sm text-destructive mt-1">{errors.price.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Product description"
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          {...register('quantity', { valueAsNumber: true })}
          placeholder="0"
        />
        {errors.quantity && (
          <p className="text-sm text-destructive mt-1">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          {...register('image')}
          placeholder="https://example.com/image.jpg"
        />
        {errors.image && (
          <p className="text-sm text-destructive mt-1">{errors.image.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : 'Save Product'}
      </Button>
    </form>
  );
}

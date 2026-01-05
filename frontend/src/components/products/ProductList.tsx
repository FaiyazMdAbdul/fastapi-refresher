import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useDebounce } from '@/hooks/useDebounce';
import { ProductCard } from './ProductCard';
import { ProductDialog } from './ProductDialog';
import { ProductFilters } from './ProductFilters';
import { LoadingGrid } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function ProductList() {
  const { data: products, isLoading, error } = useProducts();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Client-side filtering
  const filteredProducts = products?.filter((product) => {
    const searchLower = debouncedSearch.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return <LoadingGrid />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load products. Please try again." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchTerm ? 'No products found matching your search.' : 'No products found.'}
          </p>
        </div>
      )}

      <ProductDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        mode="create"
      />
    </div>
  );
}

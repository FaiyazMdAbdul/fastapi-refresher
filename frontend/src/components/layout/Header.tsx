import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Package } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h1 className="text-xl font-bold">Product Management</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { Button } from '@/components/ui/button';
import { GripVertical } from 'lucide-react';
import { type FC, type ReactNode } from 'react';

interface DraggableCardProps {
  id: string;
  children: ReactNode;
  onReorder: (draggedId: string, targetId: string) => void;
  className?: string;
}

export const DraggableCard: FC<DraggableCardProps> = ({ 
  id, 
  children, 
  onReorder, 
  className = '' 
}) => {
  const { handleDragOver, handleDrop, getDragHandleProps } = useDragAndDrop();

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop(id, onReorder)}
      className={`group relative transition-all duration-200 ${className}`}
    >
      {/* Drag Handle Button */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          variant="ghost"
          size="sm"
          {...getDragHandleProps({ id, type: 'card' })}
          title="Drag to reorder"
          className="h-8 w-8 p-0 hover:bg-background/80 backdrop-blur-sm border border-border/50 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
      
      {/* Card Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

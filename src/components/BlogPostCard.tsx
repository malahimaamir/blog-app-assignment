import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, Edit, Trash2 } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
  isAdmin?: boolean;
  onEdit?: (post: BlogPost) => void;
  onDelete?: (id: string) => void;
  onClick?: (post: BlogPost) => void;
}

export const BlogPostCard = ({ 
  post, 
  isAdmin = false, 
  onEdit, 
  onDelete, 
  onClick 
}: BlogPostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="card-elegant hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader onClick={() => onClick?.(post)} className="relative z-10">
        <CardTitle className="text-xl mb-3 text-gradient-primary group-hover:scale-105 transition-transform duration-300">
          {post.title}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <span className="font-medium">{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent onClick={() => onClick?.(post)} className="relative z-10">
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {post.content.substring(0, 150)}...
        </p>
        {isAdmin && (
          <div className="flex gap-3 mt-6 pt-4 border-t border-card-border" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(post)}
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(post.id)}
              className="flex-1"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
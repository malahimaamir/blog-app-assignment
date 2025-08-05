import { useState } from 'react';
import { BlogPost } from '@/types/blog';
import { BlogPostCard } from '@/components/BlogPostCard';
import { BlogPostForm } from '@/components/BlogPostForm';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AdminViewProps {
  onViewPublic: () => void;
}

export const AdminView = ({ onViewPublic }: AdminViewProps) => {
  const { posts, loading, createPost, updatePost, deletePost } = useBlogPosts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; postId: string; postTitle: string }>({
    open: false,
    postId: '',
    postTitle: '',
  });

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleDelete = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setDeleteDialog({ open: true, postId, postTitle: post.title });
    }
  };

  const confirmDelete = async () => {
    await deletePost(deleteDialog.postId);
    setDeleteDialog({ open: false, postId: '', postTitle: '' });
  };

  const handleFormSubmit = async (data: any) => {
    if (editingPost) {
      return await updatePost(editingPost.id, data);
    } else {
      return await createPost(data);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingPost(null);
  };

  const handleCreateNew = () => {
    setEditingPost(null);
    setIsFormOpen(true);
  };

  if (isFormOpen) {
    return (
      <div className="min-h-screen bg-gradient-hero py-12 px-6">
        <BlogPostForm
          post={editingPost || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            ⚡ Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Manage your stories and create amazing content
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={onViewPublic} variant="outline" className="px-6">
              📖 View Blog
            </Button>
            <Button onClick={handleCreateNew} variant="premium" className="px-6">
              <Plus className="w-4 h-4 mr-2" />
              ✨ Create New Story
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex items-center gap-3 text-lg text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              Loading your stories...
            </div>
          </div>
        ) : posts.length === 0 ? (
          <Card className="card-elegant max-w-md mx-auto animate-scale-in">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ready to Create?</h3>
              <p className="text-muted-foreground mb-4">Your first amazing story awaits!</p>
              <Button onClick={handleCreateNew} variant="premium">
                <Plus className="w-4 h-4 mr-2" />
                Start Writing
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogPostCard
                  post={post}
                  isAdmin={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => !open && setDeleteDialog({ open: false, postId: '', postTitle: '' })}>
        <AlertDialogContent className="card-elegant">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-gradient">🗑️ Delete Story</AlertDialogTitle>
            <AlertDialogDescription className="text-base leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-foreground">"{deleteDialog.postTitle}"</span>? 
              This action cannot be undone and your story will be lost forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="px-6">Keep Story</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg px-6"
            >
              Delete Forever
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
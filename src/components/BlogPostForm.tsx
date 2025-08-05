import { useState, useEffect } from 'react';
import { BlogPost, CreateBlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlogPostFormProps {
  post?: BlogPost;
  onSubmit: (data: CreateBlogPost) => Promise<boolean>;
  onCancel: () => void;
}

export const BlogPostForm = ({ post, onSubmit, onCancel }: BlogPostFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
      });
    }
  }, [post]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    const success = await onSubmit(formData);
    setIsSubmitting(false);

    if (success) {
      setFormData({ title: '', content: '', author: '' });
      onCancel();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="card-elegant w-full max-w-3xl mx-auto animate-scale-in">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl text-gradient">
          {post ? '✨ Edit Your Story' : '🚀 Create New Story'}
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          {post ? 'Polish your masterpiece' : 'Share your thoughts with the world'}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg font-medium">Story Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What's your story about?"
              className="text-lg py-3 bg-background/50 border-card-border focus:shadow-card transition-all duration-300"
            />
            {errors.title && (
              <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-lg font-medium">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              placeholder="Who's the storyteller?"
              className="text-lg py-3 bg-background/50 border-card-border focus:shadow-card transition-all duration-300"
            />
            {errors.author && (
              <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors.author}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-lg font-medium">Your Story</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Tell your story... What insights, experiences, or thoughts would you like to share?"
              rows={12}
              className="text-base leading-relaxed bg-background/50 border-card-border focus:shadow-card transition-all duration-300 resize-none"
            />
            {errors.content && (
              <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors.content}
              </p>
            )}
          </div>

          <div className="flex gap-4 justify-end pt-6 border-t border-card-border">
            <Button type="button" variant="outline" onClick={onCancel} className="px-8">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              variant="premium"
              className="px-8"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {post ? '✨ Update Story' : '🚀 Publish Story'}
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
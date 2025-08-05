import { useState } from 'react';
import { BlogPost } from '@/types/blog';
import { BlogPostCard } from '@/components/BlogPostCard';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlogViewProps {
  onBack: () => void;
}

export const BlogView = ({ onBack }: BlogViewProps) => {
  const { posts, loading } = useBlogPosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPost(null)}
            className="mb-8 animate-fade-in"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stories
          </Button>
          
          <article className="card-elegant p-8 lg:p-12 animate-slide-up">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-6 leading-tight">
                {selectedPost.title}
              </h1>
              
              <div className="flex items-center gap-6 text-muted-foreground border-l-4 border-primary pl-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-medium text-lg">{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="text-lg">{formatDate(selectedPost.created_at)}</span>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-8 text-lg">
                {selectedPost.content}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold text-gradient mb-6">
            Discover Amazing Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our collection of thoughtfully crafted articles and insights
          </p>
          <div className="mt-8">
            <Button variant="premium" onClick={onBack} className="px-8 py-3">
              Go to Admin Dashboard
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex items-center gap-3 text-lg text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              Loading amazing content...
            </div>
          </div>
        ) : posts.length === 0 ? (
          <Card className="card-elegant max-w-md mx-auto animate-scale-in">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">No Stories Yet</h3>
              <p className="text-muted-foreground">Be the first to share something amazing!</p>
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
                  onClick={setSelectedPost}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '@/types/blog';
import { useToast } from '@/hooks/use-toast';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: CreateBlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([postData]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      
      await fetchPosts();
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
      return false;
    }
  };

  const updatePost = async (id: string, postData: UpdateBlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      
      await fetchPosts();
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
      return false;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      
      await fetchPosts();
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
};
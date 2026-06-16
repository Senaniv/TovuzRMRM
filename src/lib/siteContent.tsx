'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';
import { Doctor, Service, BlogPost } from './types';
import { doctors as defaultDoctors, services as defaultServices, blogPosts as defaultBlogPosts } from './data';
import {
  Review,
  SiteContent,
  defaultContent,
  mapDbDoctor,
  mapDoctorToDb,
  mapDbService,
  mapServiceToDb,
  mapDbBlogPost,
  mapBlogPostToDb,
} from './siteContentShared';

// Export everything from siteContentShared so client components can import them from siteContent
export * from './siteContentShared';

const SiteContentContext = createContext<{
  content: SiteContent;
  saveContent: (updated: SiteContent) => Promise<void>;
  resetContent: () => Promise<void>;
  loaded: boolean;

  doctors: Doctor[];
  services: Service[];
  blogPosts: BlogPost[];

  saveDoctor: (doctor: Doctor) => Promise<void>;
  deleteDoctor: (id: string) => Promise<void>;
  saveService: (service: Service) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  saveBlogPost: (post: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
}>({
  content: defaultContent,
  saveContent: async () => {},
  resetContent: async () => {},
  loaded: false,

  doctors: [],
  services: [],
  blogPosts: [],

  saveDoctor: async () => {},
  deleteDoctor: async () => {},
  saveService: async () => {},
  deleteService: async () => {},
  saveBlogPost: async () => {},
  deleteBlogPost: async () => {},
});

export function useSiteContent() {
  return useContext(SiteContentContext);
}

function isUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

export function SiteContentProvider({
  children,
  initialContent,
  initialDoctors,
  initialServices,
  initialBlogPosts,
}: {
  children: React.ReactNode;
  initialContent: SiteContent;
  initialDoctors?: Doctor[];
  initialServices?: Service[];
  initialBlogPosts?: BlogPost[];
}) {
  const [content, setContent] = useState<SiteContent>(initialContent || defaultContent);
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors || defaultDoctors);
  const [services, setServices] = useState<Service[]>(initialServices || defaultServices);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts || defaultBlogPosts);
  const [loaded, setLoaded] = useState(true);

  // Sync client-side state if initial values change (from SSR)
  useEffect(() => {
    if (initialContent) setContent(initialContent);
  }, [initialContent]);

  useEffect(() => {
    if (initialDoctors) setDoctors(initialDoctors);
  }, [initialDoctors]);

  useEffect(() => {
    if (initialServices) setServices(initialServices);
  }, [initialServices]);

  useEffect(() => {
    if (initialBlogPosts) setBlogPosts(initialBlogPosts);
  }, [initialBlogPosts]);

  const saveContent = useCallback(async (updated: SiteContent) => {
    setContent(updated);
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 1, content: updated, updated_at: new Date().toISOString() });
      if (error) {
        console.error('Failed to save content to Supabase:', error.message);
      }
    } catch (err) {
      console.error('Failed to save content to Supabase:', err);
    }
  }, []);

  const resetContent = useCallback(async () => {
    setContent(defaultContent);
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 1, content: defaultContent, updated_at: new Date().toISOString() });
      if (error) {
        console.error('Failed to reset content in Supabase:', error.message);
      }
    } catch (err) {
      console.error('Failed to reset content in Supabase:', err);
    }
  }, []);

  // Doctors CRUD
  const saveDoctor = useCallback(async (doc: Doctor) => {
    try {
      const dbDoc = mapDoctorToDb(doc);
      const isUpdate = !!dbDoc.id;
      
      let res;
      if (isUpdate) {
        res = await supabase.from('doctors').upsert(dbDoc).select();
      } else {
        res = await supabase.from('doctors').insert(dbDoc).select();
      }

      if (res.error) {
        console.error('Error saving doctor to Supabase:', res.error.message);
        return;
      }

      const savedDoc = mapDbDoctor(res.data[0]);
      setDoctors(prev => {
        if (isUpdate) {
          return prev.map(d => d.id === savedDoc.id ? savedDoc : d).sort((a, b) => a.orderIndex - b.orderIndex);
        } else {
          const exists = prev.some(d => d.id === doc.id);
          if (exists) {
            return prev.map(d => d.id === doc.id ? savedDoc : d).sort((a, b) => a.orderIndex - b.orderIndex);
          } else {
            return [...prev, savedDoc].sort((a, b) => a.orderIndex - b.orderIndex);
          }
        }
      });
    } catch (err) {
      console.error('Failed to save doctor:', err);
    }
  }, [doctors]);

  const deleteDoctor = useCallback(async (id: string) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
    if (isUuid(id)) {
      try {
        const { error } = await supabase.from('doctors').delete().eq('id', id);
        if (error) console.error('Error deleting doctor from Supabase:', error.message);
      } catch (err) {
        console.error('Failed to delete doctor:', err);
      }
    }
  }, []);

  // Services CRUD
  const saveService = useCallback(async (svc: Service) => {
    try {
      const dbSvc = mapServiceToDb(svc);
      const isUpdate = !!dbSvc.id;
      
      let res;
      if (isUpdate) {
        res = await supabase.from('services').upsert(dbSvc).select();
      } else {
        res = await supabase.from('services').insert(dbSvc).select();
      }

      if (res.error) {
        console.error('Error saving service to Supabase:', res.error.message);
        return;
      }

      const savedSvc = mapDbService(res.data[0]);
      setServices(prev => {
        if (isUpdate) {
          return prev.map(s => s.id === savedSvc.id ? savedSvc : s).sort((a, b) => a.orderIndex - b.orderIndex);
        } else {
          const exists = prev.some(s => s.id === svc.id);
          if (exists) {
            return prev.map(s => s.id === svc.id ? savedSvc : s).sort((a, b) => a.orderIndex - b.orderIndex);
          } else {
            return [...prev, savedSvc].sort((a, b) => a.orderIndex - b.orderIndex);
          }
        }
      });
    } catch (err) {
      console.error('Failed to save service:', err);
    }
  }, [services]);

  const deleteService = useCallback(async (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    if (isUuid(id)) {
      try {
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) console.error('Error deleting service from Supabase:', error.message);
      } catch (err) {
        console.error('Failed to delete service:', err);
      }
    }
  }, []);

  // Blogs CRUD
  const saveBlogPost = useCallback(async (post: BlogPost) => {
    try {
      const dbBlog = mapBlogPostToDb(post);
      const isUpdate = !!dbBlog.id;
      
      let res;
      if (isUpdate) {
        res = await supabase.from('blogs').upsert(dbBlog).select();
      } else {
        res = await supabase.from('blogs').insert(dbBlog).select();
      }

      if (res.error) {
        console.error('Error saving blog post to Supabase:', res.error.message);
        return;
      }

      const savedPost = mapDbBlogPost(res.data[0]);
      setBlogPosts(prev => {
        if (isUpdate) {
          return prev.map(p => p.id === savedPost.id ? savedPost : p).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        } else {
          const exists = prev.some(p => p.id === post.id);
          if (exists) {
            return prev.map(p => p.id === post.id ? savedPost : p).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
          } else {
            return [...prev, savedPost].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
          }
        }
      });
    } catch (err) {
      console.error('Failed to save blog post:', err);
    }
  }, [blogPosts]);

  const deleteBlogPost = useCallback(async (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
    if (isUuid(id)) {
      try {
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (error) console.error('Error deleting blog post from Supabase:', error.message);
      } catch (err) {
        console.error('Failed to delete blog post:', err);
      }
    }
  }, []);

  return (
    <SiteContentContext.Provider
      value={{
        content,
        saveContent,
        resetContent,
        loaded,
        doctors,
        services,
        blogPosts,
        saveDoctor,
        deleteDoctor,
        saveService,
        deleteService,
        saveBlogPost,
        deleteBlogPost,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

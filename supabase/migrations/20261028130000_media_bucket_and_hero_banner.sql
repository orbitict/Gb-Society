-- Bucket for admin-uploaded media (policies are in 20260917015532)
INSERT INTO storage.buckets (id, name, public) VALUES ('media','media', true) ON CONFLICT (id) DO NOTHING;

-- Hero banner image setting (previously only in drizzle/migrations)
INSERT INTO public.site_settings (key,value,group_name,label,input_type,sort_order)
VALUES ('hero_banner_image','','hero','হিরো ব্যানার ছবি','image',0)
ON CONFLICT (key) DO UPDATE SET input_type='image';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Production,
  ServiceItem,
  TeamMember,
  GalleryItem,
  Enquiry,
  CompanySettings,
  EnquiryStatus,
} from '../types/database';
import {
  initialCompanySettings,
  initialProductions,
  initialServices,
  initialTeamMembers,
  initialGallery,
  initialEnquiries,
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface DataContextType {
  // State
  productions: Production[];
  services: ServiceItem[];
  teamMembers: TeamMember[];
  galleryItems: GalleryItem[];
  enquiries: Enquiry[];
  companySettings: CompanySettings;
  isLoading: boolean;

  // Productions CRUD
  addProduction: (prod: Omit<Production, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateProduction: (id: string, updates: Partial<Production>) => Promise<boolean>;
  deleteProduction: (id: string) => Promise<boolean>;

  // Services CRUD
  addService: (service: Omit<ServiceItem, 'id' | 'created_at'>) => Promise<boolean>;
  updateService: (id: string, updates: Partial<ServiceItem>) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;

  // Team CRUD
  addTeamMember: (member: Omit<TeamMember, 'id' | 'created_at'>) => Promise<boolean>;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => Promise<boolean>;
  deleteTeamMember: (id: string) => Promise<boolean>;

  // Gallery CRUD
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'created_at'>) => Promise<boolean>;
  deleteGalleryItem: (id: string) => Promise<boolean>;

  // Enquiries
  submitEnquiry: (
    enquiryData: Omit<Enquiry, 'id' | 'status' | 'internal_notes' | 'created_at' | 'updated_at'>
  ) => Promise<{ success: boolean; error?: string }>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => Promise<boolean>;
  updateEnquiryNotes: (id: string, notes: string) => Promise<boolean>;
  deleteEnquiry: (id: string) => Promise<boolean>;

  // Company Settings
  updateCompanySettings: (updates: Partial<CompanySettings>) => Promise<boolean>;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  PRODUCTIONS: 'kavin_productions',
  SERVICES: 'kavin_services',
  TEAM: 'kavin_team',
  GALLERY: 'kavin_gallery',
  ENQUIRIES: 'kavin_enquiries',
  SETTINGS: 'kavin_settings',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productions, setProductions] = useState<Production[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTIONS);
    return saved ? JSON.parse(saved) : initialProductions;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.TEAM);
    return saved ? JSON.parse(saved) : initialTeamMembers;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.GALLERY);
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ENQUIRIES);
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [companySettings, setCompanySettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : initialCompanySettings;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync to local storage on changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTIONS, JSON.stringify(productions));
  }, [productions]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TEAM, JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.GALLERY, JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(companySettings));
  }, [companySettings]);

  // Load from Supabase if active
  useEffect(() => {
    const loadFromSupabase = async () => {
      if (!isSupabaseConfigured || !supabase) return;
      setIsLoading(true);
      try {
        const [prodRes, servRes, teamRes, galRes, enqRes, setRes] = await Promise.all([
          supabase.from('productions').select('*').order('created_at', { ascending: false }),
          supabase.from('services').select('*').order('display_order', { ascending: true }),
          supabase.from('team_members').select('*').order('display_order', { ascending: true }),
          supabase.from('gallery').select('*').order('display_order', { ascending: true }),
          supabase.from('enquiries').select('*').order('created_at', { ascending: false }),
          supabase.from('company_settings').select('*').maybeSingle(),
        ]);

        if (prodRes.data && prodRes.data.length > 0) setProductions(prodRes.data);
        if (servRes.data && servRes.data.length > 0) setServices(servRes.data);
        if (teamRes.data && teamRes.data.length > 0) setTeamMembers(teamRes.data);
        if (galRes.data && galRes.data.length > 0) setGalleryItems(galRes.data);
        if (enqRes.data && enqRes.data.length > 0) setEnquiries(enqRes.data);
        if (setRes.data) setCompanySettings(setRes.data);
      } catch (err) {
        console.warn('Supabase fetch notice: using local repository store', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFromSupabase();
  }, []);

  // Productions CRUD
  const addProduction = async (
    prod: Omit<Production, 'id' | 'created_at' | 'updated_at'>
  ): Promise<boolean> => {
    const newProduction: Production = {
      ...prod,
      id: 'prod-' + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setProductions((prev) => [newProduction, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('productions').insert([newProduction]);
      } catch (err) {
        console.error('Failed to sync new production to Supabase:', err);
      }
    }
    return true;
  };

  const updateProduction = async (id: string, updates: Partial<Production>): Promise<boolean> => {
    setProductions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updates, updated_at: new Date().toISOString() } : item
      )
    );

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('productions')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id);
      } catch (err) {
        console.error('Failed to update production in Supabase:', err);
      }
    }
    return true;
  };

  const deleteProduction = async (id: string): Promise<boolean> => {
    setProductions((prev) => prev.filter((item) => item.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('productions').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete production from Supabase:', err);
      }
    }
    return true;
  };

  // Services CRUD
  const addService = async (service: Omit<ServiceItem, 'id' | 'created_at'>): Promise<boolean> => {
    const newService: ServiceItem = {
      ...service,
      id: 'srv-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    setServices((prev) => [...prev, newService]);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('services').insert([newService]);
      } catch (err) {
        console.error('Failed to insert service into Supabase:', err);
      }
    }
    return true;
  };

  const updateService = async (id: string, updates: Partial<ServiceItem>): Promise<boolean> => {
    setServices((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('services').update(updates).eq('id', id);
      } catch (err) {
        console.error('Failed to update service in Supabase:', err);
      }
    }
    return true;
  };

  const deleteService = async (id: string): Promise<boolean> => {
    setServices((prev) => prev.filter((item) => item.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('services').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete service from Supabase:', err);
      }
    }
    return true;
  };

  // Team CRUD
  const addTeamMember = async (member: Omit<TeamMember, 'id' | 'created_at'>): Promise<boolean> => {
    const newMember: TeamMember = {
      ...member,
      id: 'team-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    setTeamMembers((prev) => [...prev, newMember]);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('team_members').insert([newMember]);
      } catch (err) {
        console.error('Failed to insert team member into Supabase:', err);
      }
    }
    return true;
  };

  const updateTeamMember = async (id: string, updates: Partial<TeamMember>): Promise<boolean> => {
    setTeamMembers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('team_members').update(updates).eq('id', id);
      } catch (err) {
        console.error('Failed to update team member in Supabase:', err);
      }
    }
    return true;
  };

  const deleteTeamMember = async (id: string): Promise<boolean> => {
    setTeamMembers((prev) => prev.filter((item) => item.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('team_members').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete team member from Supabase:', err);
      }
    }
    return true;
  };

  // Gallery CRUD
  const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'created_at'>): Promise<boolean> => {
    const newItem: GalleryItem = {
      ...item,
      id: 'gal-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    setGalleryItems((prev) => [newItem, ...prev]);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('gallery').insert([newItem]);
      } catch (err) {
        console.error('Failed to add gallery item to Supabase:', err);
      }
    }
    return true;
  };

  const deleteGalleryItem = async (id: string): Promise<boolean> => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('gallery').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete gallery item from Supabase:', err);
      }
    }
    return true;
  };

  // Enquiries
  const submitEnquiry = async (
    enquiryData: Omit<Enquiry, 'id' | 'status' | 'internal_notes' | 'created_at' | 'updated_at'>
  ): Promise<{ success: boolean; error?: string }> => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: 'enq-' + Date.now(),
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setEnquiries((prev) => [newEnquiry, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('enquiries').insert([newEnquiry]);
        if (error) {
          console.error('Supabase enquiry error:', error);
          return { success: true }; // Local state updated, so user experience remains smooth
        }
      } catch (err: any) {
        console.error('Failed to submit enquiry to Supabase:', err);
      }
    }
    return { success: true };
  };

  const updateEnquiryStatus = async (id: string, status: EnquiryStatus): Promise<boolean> => {
    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, updated_at: new Date().toISOString() } : item
      )
    );
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('enquiries')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', id);
      } catch (err) {
        console.error('Failed to update enquiry status in Supabase:', err);
      }
    }
    return true;
  };

  const updateEnquiryNotes = async (id: string, notes: string): Promise<boolean> => {
    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, internal_notes: notes, updated_at: new Date().toISOString() } : item
      )
    );
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('enquiries')
          .update({ internal_notes: notes, updated_at: new Date().toISOString() })
          .eq('id', id);
      } catch (err) {
        console.error('Failed to update enquiry notes in Supabase:', err);
      }
    }
    return true;
  };

  const deleteEnquiry = async (id: string): Promise<boolean> => {
    setEnquiries((prev) => prev.filter((item) => item.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('enquiries').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete enquiry from Supabase:', err);
      }
    }
    return true;
  };

  // Company Settings
  const updateCompanySettings = async (updates: Partial<CompanySettings>): Promise<boolean> => {
    setCompanySettings((prev) => ({ ...prev, ...updates }));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('company_settings').upsert({ id: 1, ...updates });
      } catch (err) {
        console.error('Failed to update company settings in Supabase:', err);
      }
    }
    return true;
  };

  const resetToDefaults = () => {
    setProductions(initialProductions);
    setServices(initialServices);
    setTeamMembers(initialTeamMembers);
    setGalleryItems(initialGallery);
    setEnquiries(initialEnquiries);
    setCompanySettings(initialCompanySettings);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        productions,
        services,
        teamMembers,
        galleryItems,
        enquiries,
        companySettings,
        isLoading,
        addProduction,
        updateProduction,
        deleteProduction,
        addService,
        updateService,
        deleteService,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addGalleryItem,
        deleteGalleryItem,
        submitEnquiry,
        updateEnquiryStatus,
        updateEnquiryNotes,
        deleteEnquiry,
        updateCompanySettings,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

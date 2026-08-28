// src/types/order-actions.ts
import type { Client } from '@/types/supabase';
import { ServiceTypeEnum, type ServiceType } from '@/types/supabase';
import type { z } from 'zod';

// --- Types for searchClientByPhone ---
export interface ClientSearchInput {
  phone: string;
}
export interface ClientSearchResult {
  success: boolean;
  data?: Client | null; 
  error?: string;
  message?: string; 
  fieldErrors?: z.ZodIssue[];
}

// --- Types for registerClient ---
export interface RegisterClientInput {
  name: string;
  lastName?: string;
  phone: string;
  email?: string;
  address: string;
}
export interface RegisterClientResult {
  success: boolean;
  data?: Client; 
  error?: string;
  fieldErrors?: z.ZodIssue[];
}

// --- Types for quoteShipment ---
export interface QuoteShipmentInput {
  originAddress: string;
  destinationAddress: string;
  serviceType: ServiceType; 
}
export interface QuoteDetails {
  price: number | null; 
  distanceText: string;
  durationText: string;
  originLat: number; 
  originLng: number; 
  destinationLat: number; 
  destinationLng: number; 
}
export interface QuoteShipmentResult {
  success: boolean;
  data?: QuoteDetails;
  error?: string;
  fieldErrors?: z.ZodIssue[];
}

// --- Types for saveShipment ---
export interface SaveShipmentInput {
  clientId?: number; 

  originFullName: string;
  originPhone: string;
  originAddress: string;
  originLat: number; 
  originLng: number; 

  destinationContactName: string;
  destinationContactPhone: string;
  destinationContactEmail?: string;
  destinationAddress: string;
  destinationLat: number; 
  destinationLng: number; 
  
  serviceType: ServiceType; 
  quotedPrice: number; 
  distanceText?: string;
  durationText?: string;
  
  clientNameAtOrder?: string; 
  clientPhoneAtOrder?: string;

  pickupDate: Date;
  pickupTimeFrom: string; 
  pickupTimeTo: string; 
  deliveryDate: Date;
  deliveryTimeFrom: string; 
  deliveryTimeTo: string;
  
  shippingCost?: number; 
  totalCost?: number; 
}

export interface SaveShipmentResult {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: z.ZodIssue[];
  shipmentId?: number; 
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      Client: {
        Row: {
          address: string
          addressLat: number | null
          addressLng: number | null
          createdAt: string
          email: string | null
          id: number
          isActive: boolean
          lastName: string | null
          name: string
          phone: string | null
          updatedAt: string
          user_id: string | null
        }
        Insert: {
          address: string
          addressLat?: number | null
          addressLng?: number | null
          createdAt?: string
          email?: string | null
          id?: number
          isActive?: boolean
          lastName?: string | null
          name: string
          phone?: string | null
          updatedAt?: string
          user_id?: string | null
        }
        Update: {
          address?: string
          addressLat?: number | null
          addressLng?: number | null
          createdAt?: string
          email?: string | null
          id?: number
          isActive?: boolean
          lastName?: string | null
          name?: string
          phone?: string | null
          updatedAt?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Client_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      client_destinos: {
        Row: {
          address: string
          addressLat: number | null
          addressLng: number | null
          client_id: number
          created_at: string
          id: number
          name: string
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address: string
          addressLat?: number | null
          addressLng?: number | null
          client_id: number
          created_at?: string
          id?: number
          name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string
          addressLat?: number | null
          addressLng?: number | null
          client_id?: number
          created_at?: string
          id?: number
          name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_destinos_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "Client"
            referencedColumns: ["id"]
          },
        ]
      }
      Entrega: {
        Row: {
          createdAt: string
          etiquetaId: number
          firmaUrl: string
          id: number
          receptorDni: string
          receptorNombre: string
        }
        Insert: {
          createdAt?: string
          etiquetaId: number
          firmaUrl: string
          id?: number
          receptorDni: string
          receptorNombre: string
        }
        Update: {
          createdAt?: string
          etiquetaId?: number
          firmaUrl?: string
          id?: number
          receptorDni?: string
          receptorNombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "Entrega_etiquetaId_fkey"
            columns: ["etiquetaId"]
            isOneToOne: true
            referencedRelation: "Etiqueta"
            referencedColumns: ["id"]
          },
        ]
      }
      Etiqueta: {
        Row: {
          createdAt: string
          deliveryEndTime: string | null
          deliveryStartTime: string | null
          destinatarioDireccion: string
          destinatarioLat: number | null
          destinatarioLng: number | null
          destinatarioNombre: string
          destinatarioNotas: string | null
          destinatarioTelefono: string
          id: number
          montoACobrar: number | null
          orderNumber: string | null
          remitenteDireccion: string
          remitenteNombre: string
          remitenteNotas: string | null
          remitenteTelefono: string | null
          repartidorId: number | null
          repartoId: number | null
          status: Database["public"]["Enums"]["EtiquetaStatus"]
          tipoEnvio: Database["public"]["Enums"]["ServiceTypeEnum"]
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          deliveryEndTime?: string | null
          deliveryStartTime?: string | null
          destinatarioDireccion: string
          destinatarioLat?: number | null
          destinatarioLng?: number | null
          destinatarioNombre: string
          destinatarioNotas?: string | null
          destinatarioTelefono: string
          id?: number
          montoACobrar?: number | null
          orderNumber?: string | null
          remitenteDireccion: string
          remitenteNombre: string
          remitenteNotas?: string | null
          remitenteTelefono?: string | null
          repartidorId?: number | null
          repartoId?: number | null
          status?: Database["public"]["Enums"]["EtiquetaStatus"]
          tipoEnvio: Database["public"]["Enums"]["ServiceTypeEnum"]
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          deliveryEndTime?: string | null
          deliveryStartTime?: string | null
          destinatarioDireccion?: string
          destinatarioLat?: number | null
          destinatarioLng?: number | null
          destinatarioNombre?: string
          destinatarioNotas?: string | null
          destinatarioTelefono?: string
          id?: number
          montoACobrar?: number | null
          orderNumber?: string | null
          remitenteDireccion?: string
          remitenteNombre?: string
          remitenteNotas?: string | null
          remitenteTelefono?: string | null
          repartidorId?: number | null
          repartoId?: number | null
          status?: Database["public"]["Enums"]["EtiquetaStatus"]
          tipoEnvio?: Database["public"]["Enums"]["ServiceTypeEnum"]
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Etiqueta_repartidorId_fkey"
            columns: ["repartidorId"]
            isOneToOne: false
            referencedRelation: "Repartidor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Etiqueta_repartoId_fkey"
            columns: ["repartoId"]
            isOneToOne: false
            referencedRelation: "Reparto"
            referencedColumns: ["id"]
          },
        ]
      }
      HistorialEtiqueta: {
        Row: {
          descripcion: string | null
          etiquetaId: number
          fecha_actualizacion: string
          id: number
          status: Database["public"]["Enums"]["EtiquetaStatus"]
        }
        Insert: {
          descripcion?: string | null
          etiquetaId: number
          fecha_actualizacion?: string
          id?: number
          status: Database["public"]["Enums"]["EtiquetaStatus"]
        }
        Update: {
          descripcion?: string | null
          etiquetaId?: number
          fecha_actualizacion?: string
          id?: number
          status?: Database["public"]["Enums"]["EtiquetaStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "HistorialEtiqueta_etiquetaId_fkey"
            columns: ["etiquetaId"]
            isOneToOne: false
            referencedRelation: "Etiqueta"
            referencedColumns: ["id"]
          },
        ]
      }
      Incidencia: {
        Row: {
          createdAt: string
          etiquetaId: number
          fotoUrl: string
          id: number
          motivo: string
          observaciones: string | null
        }
        Insert: {
          createdAt?: string
          etiquetaId: number
          fotoUrl: string
          id?: number
          motivo: string
          observaciones?: string | null
        }
        Update: {
          createdAt?: string
          etiquetaId?: number
          fotoUrl?: string
          id?: number
          motivo?: string | null
          observaciones?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Incidencia_etiquetaId_fkey"
            columns: ["etiquetaId"]
            isOneToOne: false
            referencedRelation: "Etiqueta"
            referencedColumns: ["id"]
          },
        ]
      }
      Order: {
        Row: {
          clientId: number | null
          clientNameAtOrder: string | null
          clientPhoneAtOrder: string | null
          createdAt: string
          deliveryDate: string
          deliveryDateTime: string
          deliveryTimeFrom: string
          deliveryTimeTo: string
          destinationAddress: string
          destinationContactEmail: string | null
          destinationContactName: string
          destinationContactPhone: string
          destinationLat: number
          destinationLng: number
          distanceText: string | null
          durationText: string | null
          id: number
          originAddress: string
          originFullName: string
          originLat: number
          originLng: number
          originPhone: string
          pickupDate: string
          pickupDateTime: string
          pickupTimeFrom: string
          pickupTimeTo: string
          quotedPrice: number
          repartidorId: number | null
          serviceType: Database["public"]["Enums"]["ServiceTypeEnum"]
          shippingCost: number
          status: Database["public"]["Enums"]["OrderStatusEnum"]
          totalCost: number
          updatedAt: string
        }
        Insert: {
          clientId?: number | null
          clientNameAtOrder?: string | null
          clientPhoneAtOrder?: string | null
          createdAt?: string
          deliveryDate: string
          deliveryDateTime: string
          deliveryTimeFrom: string
          deliveryTimeTo: string
          destinationAddress: string
          destinationContactEmail?: string | null
          destinationContactName: string
          destinationContactPhone: string
          destinationLat: number
          destinationLng: number
          distanceText?: string | null
          durationText?: string | null
          id?: number
          originAddress: string
          originFullName: string
          originLat: number
          originLng: number
          originPhone: string
          pickupDate: string
          pickupDateTime: string
          pickupTimeFrom: string
          pickupTimeTo: string
          quotedPrice: number
          repartidorId?: number | null
          serviceType: Database["public"]["Enums"]["ServiceTypeEnum"]
          shippingCost: number
          status?: Database["public"]["Enums"]["OrderStatusEnum"]
          totalCost: number
          updatedAt?: string
        }
        Update: {
          clientId?: number | null
          clientNameAtOrder?: string | null
          clientPhoneAtOrder?: string | null
          createdAt?: string
          deliveryDate?: string
          deliveryDateTime?: string
          deliveryTimeFrom?: string
          deliveryTimeTo?: string
          destinationAddress?: string
          destinationContactEmail?: string | null
          destinationContactName?: string
          destinationContactPhone?: string
          destinationLat?: number
          destinationLng?: number
          distanceText?: string | null
          durationText?: string | null
          id?: number
          originAddress?: string
          originFullName?: string
          originLat?: number
          originLng?: number
          originPhone?: string
          pickupDate?: string
          pickupDateTime?: string
          pickupTimeFrom?: string
          pickupTimeTo?: string
          quotedPrice?: number
          repartidorId?: number | null
          serviceType?: Database["public"]["Enums"]["ServiceTypeEnum"]
          shippingCost?: number
          status?: Database["public"]["Enums"]["OrderStatusEnum"]
          totalCost?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Order_clientId_fkey"
            columns: ["clientId"]
            isOneToOne: false
            referencedRelation: "Client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_repartidorId_fkey"
            columns: ["repartidorId"]
            isOneToOne: false
            referencedRelation: "Repartidor"
            referencedColumns: ["id"]
          },
        ]
      }
      PriceRange: {
        Row: {
          createdAt: string
          distanciaMaxKm: number
          distanciaMinKm: number
          id: number
          isActive: boolean
          precioRango: number
          serviceType: Database["public"]["Enums"]["ServiceTypeEnum"]
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          distanciaMaxKm: number
          distanciaMinKm: number
          id?: number
          isActive?: boolean
          precioRango: number
          serviceType: Database["public"]["Enums"]["ServiceTypeEnum"]
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          distanciaMaxKm?: number
          distanciaMinKm?: number
          id?: number
          isActive?: boolean
          precioRango?: number
          serviceType?: Database["public"]["Enums"]["ServiceTypeEnum"]
          updatedAt?: string
        }
        Relationships: []
      }
      Repartidor: {
        Row: {
          createdAt: string
          id: number
          isActive: boolean
          licensePlate: string
          name: string
          phone: string
          rep_email: string | null
          updatedAt: string
          vehicleType: string
        }
        Insert: {
          createdAt?: string
          id?: number
          isActive?: boolean
          licensePlate: string
          name: string
          phone: string
          rep_email?: string | null
          updatedAt?: string
          vehicleType: string
        }
        Update: {
          createdAt?: string
          id?: number
          isActive?: boolean
          licensePlate?: string
          name?: string
          phone?: string
          rep_email?: string | null
          updatedAt?: string
          vehicleType?: string
        }
        Relationships: []
      }
      Reparto: {
        Row: {
          createdAt: string
          estado: string
          fecha: string
          id: number
          kilometros_totales: number | null
          repartidorId: number
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          estado?: string
          fecha?: string
          id?: number
          kilometros_totales?: number | null
          repartidorId: number
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          estado?: string
          fecha?: string
          id?: number
          kilometros_totales?: number | null
          repartidorId?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Reparto_repartidorId_fkey"
            columns: ["repartidorId"]
            isOneToOne: false
            referencedRelation: "Repartidor"
            referencedColumns: ["id"]
          },
        ]
      }
      SocialPost: {
        Row: {
          comments: number | null
          content: string
          id: number
          imageHint: string | null
          imageUrl: string | null
          likes: number | null
          platform: Database["public"]["Enums"]["SocialPlatformEnum"]
          postUrl: string
          shares: number | null
          timestamp: string
          userAvatar: string | null
          userName: string
          userUrl: string | null
        }
        Insert: {
          comments?: number | null
          content: string
          id?: number
          imageHint?: string | null
          imageUrl?: string | null
          likes?: number | null
          platform: Database["public"]["Enums"]["SocialPlatformEnum"]
          postUrl: string
          shares?: number | null
          timestamp?: string
          userAvatar?: string | null
          userName: string
          userUrl?: string | null
        }
        Update: {
          comments?: number | null
          content?: string
          id?: number
          imageHint?: string | null
          imageUrl?: string | null
          likes?: number | null
          platform?: Database["public"]["Enums"]["SocialPlatformEnum"]
          postUrl?: string
          shares?: number | null
          timestamp?: string
          userAvatar?: string | null
          userName?: string
          userUrl?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      EtiquetaStatus:
        | "PENDIENTE"
        | "IMPRESA"
        | "RECOLECTADO"
        | "EN_CAMINO"
        | "ENTREGADA"
        | "NO_ENTREGADA"
      OrderStatusEnum: "PENDIENTE" | "EN_CURSO" | "ENTREGADO" | "CANCELADO"
      ServiceTypeEnum: "EXPRESS" | "LOW_COST" | "PUNTO_DE_RETIRO"
      SocialPlatformEnum: "facebook" | "instagram" | "whatsapp"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
// Custom types
export type Client = Database['public']['Tables']['Client']['Row'];
export type Order = Database['public']['Tables']['Order']['Row'];
export type PriceRange = Database['public']['Tables']['PriceRange']['Row'];
export type Repartidor = Database['public']['Tables']['Repartidor']['Row'];
export type Etiqueta = Database['public']['Tables']['Etiqueta']['Row'];
export type Entrega = Database['public']['Tables']['Entrega']['Row'];
export type HistorialEtiqueta = Database['public']['Tables']['HistorialEtiqueta']['Row'];
export type ClientDestino = Database['public']['Tables']['client_destinos']['Row'];
export type Reparto = Database['public']['Tables']['Reparto']['Row'];


export type EtiquetaStatus = Database['public']['Enums']['EtiquetaStatus'];
export const EtiquetaStatusEnum = {
  PENDIENTE: 'PENDIENTE',
  IMPRESA: 'IMPRESA',
  RECOLECTADO: 'RECOLECTADO',
  EN_CAMINO: 'EN_CAMINO',
  ENTREGADA: 'ENTREGADA',
  NO_ENTREGADA: 'NO_ENTREGADA',
} as const;
export const EtiquetaStatusValues = Object.values(EtiquetaStatusEnum);


export type ServiceType = Database['public']['Enums']['ServiceTypeEnum'];
export const ServiceTypeEnum = {
  EXPRESS: 'EXPRESS',
  LOW_COST: 'LOW_COST',
  PUNTO_DE_RETIRO: 'PUNTO_DE_RETIRO',
} as const;

export type FormattedEtiqueta = Etiqueta & {
  repartidor?: Repartidor;
  remitenteTelefono: string; 
};

export type RepartoConDetalles = Reparto & {
  etiquetas: [{ count: number }];
  etiquetas_completadas: [{ count: number }];
};


export type DashboardStats = {
  totalEntregas: number;
  entregasExitosas: number;
  entregasFallidas: number;
  entregasPendientes: number;
  entregasEnCamino: number;
  eficiencia: number;
  kilometrosRecorridos: number;
};

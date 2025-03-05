export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Community: {
        Row: {
          createdAt: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id: string
          name: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      CommunityMember: {
        Row: {
          communityId: string
          id: string
          joinedAt: string
          userId: string
        }
        Insert: {
          communityId: string
          id: string
          joinedAt?: string
          userId: string
        }
        Update: {
          communityId?: string
          id?: string
          joinedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "CommunityMember_communityId_fkey"
            columns: ["communityId"]
            isOneToOne: false
            referencedRelation: "Community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "CommunityMember_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Course: {
        Row: {
          createdAt: string
          description: string | null
          difficulty: string | null
          duration: number | null
          id: string
          provider: string | null
          tags: string[] | null
          title: string
          url: string | null
        }
        Insert: {
          createdAt?: string
          description?: string | null
          difficulty?: string | null
          duration?: number | null
          id: string
          provider?: string | null
          tags?: string[] | null
          title: string
          url?: string | null
        }
        Update: {
          createdAt?: string
          description?: string | null
          difficulty?: string | null
          duration?: number | null
          id?: string
          provider?: string | null
          tags?: string[] | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      JobProfile: {
        Row: {
          createdAt: string
          education: string | null
          experience: string | null
          id: string
          skills: string[] | null
          title: string | null
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          education?: string | null
          experience?: string | null
          id: string
          skills?: string[] | null
          title?: string | null
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          education?: string | null
          experience?: string | null
          id?: string
          skills?: string[] | null
          title?: string | null
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "JobProfile_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      LearningGoal: {
        Row: {
          createdAt: string
          description: string | null
          id: string
          title: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id: string
          title: string
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: string
          title?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "LearningGoal_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      LearningTask: {
        Row: {
          createdAt: string
          description: string | null
          id: string
          isCompleted: boolean
          learningGoalId: string
          scheduledTime: string
          title: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id: string
          isCompleted?: boolean
          learningGoalId: string
          scheduledTime: string
          title: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: string
          isCompleted?: boolean
          learningGoalId?: string
          scheduledTime?: string
          title?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "LearningTask_learningGoalId_fkey"
            columns: ["learningGoalId"]
            isOneToOne: false
            referencedRelation: "LearningGoal"
            referencedColumns: ["id"]
          },
        ]
      }
      ScreenTimeRecord: {
        Row: {
          appName: string
          date: string
          duration: number
          id: string
          userId: string
        }
        Insert: {
          appName: string
          date?: string
          duration: number
          id: string
          userId: string
        }
        Update: {
          appName?: string
          date?: string
          duration?: number
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ScreenTimeRecord_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: string
        }
        Insert: {
          createdAt?: string
          email: string
          id: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
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
      [_ in never]: never
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
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};

export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        { fieldName: "primary", type: "color", required: true, label: "Primary" },
        { fieldName: "secondary", type: "color", required: true, label: "Secondary" },
        { fieldName: "accent", type: "color", required: true, label: "Accent" },
      ],
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Tagline",
    },
    {
      fieldName: "heroTitle",
      type: "string",
      required: false,
      label: "Hero Title",
    },
    {
      fieldName: "heroSubtitle",
      type: "string",
      required: false,
      label: "Hero Subtitle",
    },
    {
      fieldName: "heroImage",
      type: "file",
      required: false,
      label: "Hero Image",
    },
    {
      fieldName: "shopCtaLabel",
      type: "string",
      required: false,
      label: "Shop CTA Label",
    },
    {
      fieldName: "vetCtaLabel",
      type: "string",
      required: false,
      label: "Vet CTA Label",
    },
    {
      fieldName: "hotelCtaLabel",
      type: "string",
      required: false,
      label: "Hotel CTA Label",
    },
    {
      fieldName: "chatCtaLabel",
      type: "string",
      required: false,
      label: "AI Chat CTA Label",
    },
    {
      fieldName: "footerText",
      type: "string",
      required: false,
      label: "Footer Text",
    },
    {
      fieldName: "contactEmail",
      type: "string",
      required: false,
      label: "Contact Email",
    },
    {
      fieldName: "contactPhone",
      type: "string",
      required: false,
      label: "Contact Phone",
    },
    {
      fieldName: "businessHours",
      type: "string",
      required: false,
      label: "Business Hours",
    },
    {
      fieldName: "aiAssistantName",
      type: "string",
      required: false,
      label: "AI Assistant Name",
    },
    {
      fieldName: "aiSystemPrompt",
      type: "string",
      required: false,
      label: "AI System Prompt",
    },
    {
      fieldName: "enableAiChat",
      type: "boolean",
      required: false,
      label: "Enable AI Chat",
    },
    {
      fieldName: "enableVetBooking",
      type: "boolean",
      required: false,
      label: "Enable Vet Booking",
    },
    {
      fieldName: "enableHotelBooking",
      type: "boolean",
      required: false,
      label: "Enable Hotel Booking",
    },
    {
      fieldName: "enableShop",
      type: "boolean",
      required: false,
      label: "Enable Shop",
    },
    {
      fieldName: "petCategories",
      type: "array",
      label: "Pet Categories",
      item: { type: "string", required: true },
    },
    {
      fieldName: "productCategories",
      type: "array",
      label: "Product Categories",
      item: { type: "string", required: true },
    },
    {
      fieldName: "itemsPerPage",
      type: "number",
      required: false,
      label: "Items Per Page",
      min: 4,
      max: 48,
    },
    {
      fieldName: "socialLinks",
      type: "object",
      required: false,
      label: "Social Links",
      fields: [
        { fieldName: "facebook", type: "url", required: false, label: "Facebook" },
        { fieldName: "instagram", type: "url", required: false, label: "Instagram" },
        { fieldName: "twitter", type: "url", required: false, label: "Twitter" },
      ],
    },
  ],
};

import type { Schema, Struct } from '@strapi/strapi';

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    description: '';
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    name: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSkills extends Struct.ComponentSchema {
  collectionName: 'components_shared_skills';
  info: {
    displayName: 'skills';
    icon: 'filePdf';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'SocialLink';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface SharedWorkExperience extends Struct.ComponentSchema {
  collectionName: 'components_shared_work_experiences';
  info: {
    displayName: 'WorkExperience';
  };
  attributes: {
    company: Schema.Attribute.String;
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    endDate: Schema.Attribute.Date;
    position: Schema.Attribute.String;
    startDate: Schema.Attribute.Date;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.quote': SharedQuote;
      'shared.seo': SharedSeo;
      'shared.skills': SharedSkills;
      'shared.social-link': SharedSocialLink;
      'shared.work-experience': SharedWorkExperience;
    }
  }
}

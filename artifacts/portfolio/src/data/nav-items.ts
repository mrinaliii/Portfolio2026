export interface NavItem {
  label: string;
  href: string;
  /** Whether this link opens the resume drawer instead of navigating */
  isDrawerTrigger?: boolean;
  /** Whether this link is external */
  isExternal?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Signal',  href: '#signal'  },
  { label: 'Work',    href: '#work'    },
  { label: 'Approach', href: '#approach' },
  { label: 'Stack',   href: '#stack'   },
  { label: 'Ask My AI', href: '#knowledge-core' },
  { label: 'Contact', href: '#contact' },
];

export const NAV_RESUME_ITEM: NavItem = {
  label: 'Resume',
  href: '#resume',
  isDrawerTrigger: true,
};

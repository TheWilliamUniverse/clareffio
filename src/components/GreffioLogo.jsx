import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.js';

const WORDMARK_SRC = '/icons/clareffio-wordmark.svg';

export const GreffioWordmark = ({ className = '', size }) => (
  <img
    src={WORDMARK_SRC}
    alt="Clareffio"
    className={cn('inline-block h-[1em] w-auto max-w-none align-[-0.08em] object-contain', className)}
    style={size ? { height: size, width: 'auto' } : undefined}
    translate="no"
    lang="fr"
  />
);

const resolveVariant = (variant) => {
  if (variant === 'icon-only' || variant === 'mark') return 'mark';
  if (variant === 'tile' || variant === 'inverse') return 'tile';
  if (variant === 'wordmark-on-blue' || variant === 'on-blue') return 'wordmark-on-blue';
  return 'wordmark';
};

export const GreffioLogo = ({ variant = 'full', className = '', to, linkLabel }) => {
  const resolved = resolveVariant(variant);
  const isIconOnly = resolved === 'mark';
  const isTile = resolved === 'tile';
  const isOnBlue = resolved === 'wordmark-on-blue';

  const visual = isIconOnly ? (
    <img
      src="/icons/clareffio-arc.svg"
      alt=""
      className="h-11 w-11 rounded-md object-contain shadow-elevation-sm"
      width={44}
      height={44}
    />
  ) : (
    <span
      className={cn(
        'inline-flex items-center leading-none',
        isTile && 'rounded-md bg-[hsl(var(--greffio-blue))] px-5 py-3 shadow-elevation-md',
      )}
    >
      <img
        src={WORDMARK_SRC}
        alt={to ? '' : 'Clareffio'}
        className={cn(
          'block w-auto max-w-none object-contain',
          isOnBlue ? 'h-6 md:h-[1.875rem]' : 'h-[1.875rem] md:h-9',
          (isTile || isOnBlue) && 'brightness-0 invert',
        )}
      />
    </span>
  );

  const logo = (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.25 }}
      className={cn('notranslate inline-flex items-center select-none', className)}
      translate="no"
      lang="fr"
      aria-hidden={Boolean(to)}
    >
      {visual}
    </motion.span>
  );

  if (to) {
    const resolvedLinkLabel = linkLabel || (
      to === '/dashboard'
        ? 'Clareffio – Retour au tableau de bord'
        : 'Clareffio – Retour à l’accueil'
    );
    return (
      <Link
        to={to}
        className={cn(
          'inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          (isTile || isOnBlue) && 'focus-visible:ring-offset-[hsl(var(--greffio-blue))]',
        )}
        aria-label={resolvedLinkLabel}
        translate="no"
      >
        {logo}
      </Link>
    );
  }

  return logo;
};

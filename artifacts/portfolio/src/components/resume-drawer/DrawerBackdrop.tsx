import { motion } from 'framer-motion';
import styles from './DrawerBackdrop.module.css';

interface DrawerBackdropProps {
  onClose: () => void;
}

export function DrawerBackdrop({ onClose }: DrawerBackdropProps) {
  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      aria-hidden="true"
    />
  );
}

import { createContext, useContext } from 'react';

/** Ouvre la fiche explicative d'une technologie à partir de son libellé. */
export const TechDialogContext = createContext<(label: string) => void>(() => {});

export const useTechDialog = () => useContext(TechDialogContext);

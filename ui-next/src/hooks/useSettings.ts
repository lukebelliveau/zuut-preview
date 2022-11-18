import { useContext } from 'react';
import { SettingsContext } from '../components/settings/SettingsContext';

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;

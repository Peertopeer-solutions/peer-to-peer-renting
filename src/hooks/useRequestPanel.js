import { REQUEST_PANEL } from '@src/constant/sidesheet';
import useSidePanel from '@src/data/zustand/sidePanelStore';
import useSideSheet from '@src/data/zustand/sidesheetStore';
import AuthContext from '@src/FirebaseAuthContext';
import useAuthStatus from '@src/hooks/useAuthStatus';
import { useCallback, useContext } from 'react';

export default function useRequestPanel() {
	const openPanel = useSidePanel((state) => state.actions.openSidePanel);
	const closePanel = useSidePanel((state) => state.actions.closeSidePanel);
	const updateSheet = useSideSheet((state) => state.actions.updateSheet);

	const openRequestPanel = useCallback(() => {
		updateSheet(REQUEST_PANEL, { test: 'test' });
		openPanel();
	}, [updateSheet, openPanel]);

	return { openRequestPanel, closeRequestPanel: closePanel };
}

import { useContext } from 'react';
import { CollapseDrawerContext } from '../contexts/CollapseDrawerContext';

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);
// const useCollapseDrawer = () => {
//   return {
//     isCollapse: false,
//     collapseClick: false,
//     collapseHover: () => {},
//     onToggleCollapse: () => {},
//     onHoverEnter: () => {},
//     onHoverLeave: () => {},
//   };
// };

export default useCollapseDrawer;

import { useAppSelector } from '../../app/hooks';
import { selectSelectedItemId } from '../../features/interactions/interactionsSelectors';
import { useSelectItemById } from '../../features/items/itemsSelectors';
import './ControlPanel.css';

const ControlPanel = () => {
  return null;
  // const selectedItemId = useAppSelector(selectSelectedItemId);
  // const item = useSelectItemById(selectedItemId);

  // if (!item) return <div id="control-panel">No item selected.</div>;

  // return (
  //   <div id="control-panel">
  //     <h2>Item {item.name}</h2>
  //     <span>Length: {item.length}</span>
  //     <br />
  //     <span>Width: {item.width}</span>
  //     <br />
  //     <span>collision state: {item.collisionState}</span>
  //   </div>
  // );
};

export default ControlPanel;

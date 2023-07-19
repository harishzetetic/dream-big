
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';

const SideListItem = ({text, onClickCallback, IconComponent, isActive, isButton}) => {
    if(isButton){
        return  <ListItemButton className={isActive ? 'active': ''}>
        <Button variant="contained" fullWidth onClick={onClickCallback}><IconComponent /> &nbsp; {text}</Button>
    </ListItemButton>
    }
    return <ListItemButton className={isActive ? 'active': ''}>
    <ListItemIcon>
      <IconComponent />
    </ListItemIcon>
    <ListItemText primary={text} onClick={onClickCallback}/>
  </ListItemButton>
}


 export default SideListItem;
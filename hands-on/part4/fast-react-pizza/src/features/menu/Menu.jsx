import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem';

function Menu() {
    const menu = useLoaderData();
    console.log(menu);

    return (
        <ul className="divide-y divide-stone-200 px-2">
            {menu.map(item => <MenuItem key={item.id} item={item} />)}
        </ul>
    );
}

async function loader() {
    const menu = await getMenu();
    return menu;
}

export default Menu;
export { loader }
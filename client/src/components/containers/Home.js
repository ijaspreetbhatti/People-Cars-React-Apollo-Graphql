import Title from '../layout/Title'
import People from '../lists/People'
import AddPerson from '../forms/AddPerson'
import Cars from '../lists/Cars'
import AddCar from '../forms/AddCar'
import { Divider } from 'antd'

const Home = (props) => {
    return (
        <>
            <Title />
            <Divider />
            <Title title={"People"} />
            <AddPerson />
            <People />
            <Divider />
            <Title title={"Cars"} />
            <AddCar />
            <Cars />
        </>
    );
}

export default Home
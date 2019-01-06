import * as React from 'react';
import { CourseItem }  from '../store/CoursesList';
import { NavLink } from 'react-router-dom';


interface CoursesListRowProps {
    name: string;
    elements: CourseItem[];
}


export class CoursesListRow extends React.Component<CoursesListRowProps, {}>
{
    render() {
        return <div className="cathegory"> {this.props.name}
            <ul className="items"> {this.getItems()} </ul>
        </div>;
    }

    getItems() {
        return this.props.elements.map(x=> {
            return <li className="item" key={x.id}>
                <NavLink to={'/course/' + x.id}>
                    <img className="imgClass" src={x.pictureUrl}></img> {x.name}
                    </NavLink></li>;
        });
    }
}
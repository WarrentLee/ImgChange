import React,{Component} from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
export default class Footer extends Component {
   render() {
   return (
      <footer className="footer">
         <Link to="/andmore">关于我们</Link>
         <em>·</em>
         <Link to="/andmore">联系我们</Link>
         <em>·</em>
         <Link to="/andmore">帮助中心</Link>
      </footer>
     )}
}
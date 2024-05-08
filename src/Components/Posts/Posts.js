import React,{useState,useEffect,useContext} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { useHistory } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';



function Posts() {
  const {firebase}=useContext(FirebaseContext)
  const [products,setProducts]= useState([])
  const [isLoading, setIsLoading] = useState(true);
  const {setPostDetails}= useContext(PostContext)
  const history= useHistory()

  useEffect(()=>{
    firebase.firestore().collection('products').get().then((snapshot)=>{
      const allPost= snapshot.docs.map((products)=>{
        return{
          ...products.data(),
          id:products.id        
        }
      })
      setProducts(allPost);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {isLoading ? (
            <div className="loader">
              <ColorRing />
            </div>
          ) : (
            products.map(product => (
              <div onClick={() => {
                setPostDetails(product)
                history.push('/view')
              }} className="card" key={product.id}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price} </p>
                  <span className="kilometer">{product.category} </span>
                  <p className="name"> {product.name} </p>
                </div>
                <div className="date">
                  <span>{product.createdAt} </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {isLoading ? (
            <div className="loader">
              <ColorRing />
            </div>
          ) : (
            products.map(product => (
              <div onClick={() => {
                setPostDetails(product)
                history.push('/view')
              }} className="card" key={product.id}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price} </p>
                  <span className="kilometer">{product.category} </span>
                  <p className="name"> {product.name} </p>
                </div>
                <div className="date">
                  <span>{product.createdAt} </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;

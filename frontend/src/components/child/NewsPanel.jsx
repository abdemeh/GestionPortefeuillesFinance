import React from 'react';
import { Link } from "react-router-dom";

const NewsPanel = () => {
  return (
      <div className='card'>
        <div className='card-header border-bottom'>
          <h6 className='text-xl mb-0'>News</h6>
        </div>
        <div className='card-body d-flex flex-column gap-24 p-24'>
          <div className='d-flex flex-wrap'>
            <Link
                to='/blog-details'
                className='blog__thumb w-100 radius-12 overflow-hidden'
            >
              <img
                  src='assets/images/blog/blog5.png'
                  alt='Article sur les cryptomonnaies'
                  className='w-100 h-100 object-fit-cover'
              />
            </Link>
            <div className='blog__content'>
              <h6 className='mb-8'>
                <Link
                    to='/blog-details'
                    className='text-line-2 text-hover-primary-600 text-md transition-2'
                >
                  Les cryptomonnaies atteignent de nouveaux sommets
                </Link>
              </h6>
              <p className='text-line-2 text-sm text-neutral-500 mb-0'>
                Le marché des cryptomonnaies a connu une croissance significative au cours des dernières semaines, avec de nombreuses cryptomonnaies atteignant des records historiques.
              </p>
            </div>
          </div>
          <div className='d-flex flex-wrap'>
            <Link
                to='/blog-details'
                className='blog__thumb w-100 radius-12 overflow-hidden'
            >
              <img
                  src='assets/images/blog/blog6.png'
                  alt='Article sur la finance décentralisée'
                  className='w-100 h-100 object-fit-cover'
              />
            </Link>
            <div className='blog__content'>
              <h6 className='mb-8'>
                <Link
                    to='/blog-details'
                    className='text-line-2 text-hover-primary-600 text-md transition-2'
                >
                  La finance décentralisée gagne en popularité
                </Link>
              </h6>
              <p className='text-line-2 text-sm text-neutral-500 mb-0'>
                La finance décentralisée (DeFi) continue de gagner en popularité, avec de plus en plus de personnes utilisant des plateformes DeFi pour emprunter, prêter et échanger des cryptomonnaies.
              </p>
            </div>
          </div>
          <div className='d-flex flex-wrap'>
            <Link
                to='/blog-details'
                className='blog__thumb w-100 radius-12 overflow-hidden'
            >
              <img
                  src='assets/images/blog/blog7.png'
                  alt='Article sur les jetons non fongibles'
                  className='w-100 h-100 object-fit-cover'
              />
            </Link>
            <div className='blog__content'>
              <h6 className='mb-8'>
                <Link
                    to='/blog-details'
                    className='text-line-2 text-hover-primary-600 text-md transition-2'
                >
                  Les jetons non fongibles (NFT) révolutionnent le monde de l'art
                </Link>
              </h6>
              <p className='text-line-2 text-sm text-neutral-500 mb-0'>
                Les jetons non fongibles (NFT) ont pris d'assaut le monde de l'art, permettant aux artistes de vendre leurs œuvres numériques de manière unique et authentique.
              </p>
            </div>
          </div>
          <div className='d-flex flex-wrap'>
            <Link
                to='/blog-details'
                className='blog__thumb w-100 radius-12 overflow-hidden'
            >
              <img
                  src='assets/images/blog/blog6.png'
                  alt='Article sur la réglementation des cryptomonnaies'
                  className='w-100 h-100 object-fit-cover'
              />
            </Link>
            <div className='blog__content'>
              <h6 className='mb-8'>
                <Link
                    to='/blog-details'
                    className='text-line-2 text-hover-primary-600 text-md transition-2'
                >
                  La réglementation des cryptomonnaies se précise
                </Link>
              </h6>
              <p className='text-line-2 text-sm text-neutral-500 mb-0'>
                Les gouvernements du monde entier commencent à adopter une approche plus claire de la réglementation des cryptomonnaies, ce qui pourrait avoir un impact significatif sur l'avenir du marché.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default NewsPanel;
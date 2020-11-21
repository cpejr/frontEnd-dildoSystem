import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./CarouselStyle.css";
import CardProduct from '../ProductCard/ProductCard';
import api from "../../services/api";

import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function CarouselProducts() {
    const [index, setIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [initProducts, setInitProducts] = useState([]);
    const [numberElements, setNumberElements] = useState(Math.floor(window.innerWidth / 300));

    useEffect(() => {

        
       function handleWindowSize(){
            
            console.log("handleWindowSize");
            let aux 
            aux = Math.floor(window.innerWidth / 300);
            if (aux > 4)
                aux = 5;
            if(aux>0) 
            setNumberElements(aux);
        }
        window.addEventListener("resize",handleWindowSize);

    }
        , []);



    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };


    const accessToken = localStorage.getItem("accessToken");

    const config = {
        headers: { authorization: `Bearer ${accessToken}` },
    };

    useEffect(() => {
        api.get("products/?release=true", config).then((response) => {

            setInitProducts(response.data);
            const prod = response.data;
            let auxArray = [];
            const quotient = Math.floor(prod.length / numberElements);
            const remainder = prod.length % numberElements;
            console.log(quotient, " ", remainder);

            for (let i = 0; i < quotient; i++) {
                
                let elements = [];
                for (let j = 0; j < numberElements; j++) {
                    elements.push(prod[i * numberElements + j])
                }
                auxArray.push(elements);
            }

            let lastElements = [];
            for (let i = 0; i < remainder; i++) {
                console.log("segundo");
                lastElements.push(prod[quotient * numberElements + i])
            }
            if (lastElements.length > 0)
                auxArray.push(lastElements);
            console.log(auxArray);
            setProducts(auxArray);


        });

    }, [])

    useEffect(() => {

        let auxArray = [];
        let quotient;
        let remainder;

        if( (quotient!=NaN && remainder!=NaN)){
         quotient = Math.floor(initProducts.length / numberElements);
         remainder = initProducts.length % numberElements;
    

        console.log(quotient, " ", remainder);

        for (let i = 0; i < quotient; i++) {
            console.log("FirstElements");
            let elements = [];
            for (let j = 0; j < numberElements; j++) {
                elements.push(initProducts[i * numberElements + j])
            }
            auxArray.push(elements);
        }

        let lastElements = [];
        for (let i = 0; i < remainder; i++) {
            console.log("LastElements");
            lastElements.push(initProducts[quotient * numberElements + i])
        }
        if (lastElements.length > 0)
            auxArray.push(lastElements);
        console.log(auxArray);
        setProducts(auxArray);
    }

    }, [numberElements]);



    return (
        <div className="Carousel">
            <Carousel activeIndex={index} onSelect={handleSelect} nextIcon={<span aria-hidden="true" className="carousel-control" ><GrFormNext/></span>} prevIcon={<span aria-hidden="true" className="carousel-control" ><GrFormPrevious/></span>}>
                {products.map((elements, index) => {
                    console.log(products);
                    return (
                        <Carousel.Item>
                            <div className="number">
                                {elements.map((product, index) => {
                                    return (<CardProduct product={product} />)
                                })}
                            </div>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    );
}
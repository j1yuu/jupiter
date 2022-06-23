import styles from './Flex.module.scss'
import Image from 'next/image'
import { items } from './items.js'
import { useLayoutEffect, useEffect, useState } from 'react'
import useEventListener from '@use-it/event-listener'

function useWindowSize() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const DELETE_KEYS = ['46', 'Delete'];

export default function Flex() {
    const width = useWindowSize()
    const [filteredList, setFilteredList] = useState(items);
    const [val, setVal] = useState("")
    const [i, setI] = useState(9)
    const [classes, setClasses] = useState('l')

    const handleChangeDiv = (e) => {
        setVal(e.target.textContent)
    }

    const filterByValue = (filteredData) => {
        if (val == "") { return filteredData }
        const filteredArr = filteredData.filter(
            item => item.type == val,
        );
        return filteredArr;
    }

    const handleChange = (e) => {
        setVal(e.target.value)
    }
    const handleClick = () => {
        setI(i + 9)
    }
    const handleToggle = (e) => {
        let btn = e.target.closest('.flex__card')
        btn.classList.toggle('card-active')
    }

    function handler({ key }) {
        if (DELETE_KEYS.includes(String(key))) {
            let activeCards = document.querySelectorAll('.card-active');
            activeCards.forEach((actCard) => {
                let ID = actCard.id
                setClasses('hidden')
                actCard.classList.add(classes)
                items.forEach((item, i) => {
                    if (ID == item.__id) return filteredList.splice(i, 1)
                })

            })
        }
    }

    useEventListener('keydown', handler);

    useEffect(() => {
        var filteredData = filterByValue(items);
        setFilteredList(filteredData);
        setI(9)
        setClasses('l')
    },
        [val]);

    return (
        <div className={styles.flex}>
            <div className="container">
                <div className={styles.flex__buttons}>
                    <input
                        className='flex__radio active'
                        type="radio"
                        value=""
                        name="radio"
                        id="radioAll"
                        onChange={handleChange}
                    />
                    <label className='flex__label' htmlFor="radioAll">Show All</label>
                    <input
                        className='flex__radio'
                        type="radio"
                        value="Design"
                        name="radio"
                        id="radioDesign"
                        onChange={handleChange}
                    />
                    <label className='flex__label' htmlFor="radioDesign">Design</label>
                    <input
                        className='flex__radio'
                        type="radio"
                        value="Branding"
                        name="radio"
                        id="radioBranding"
                        onChange={handleChange}
                    />
                    <label className='flex__label' htmlFor="radioBranding">Branding</label>
                    <input
                        className='flex__radio'
                        type="radio"
                        value="Illustration"
                        name="radio"
                        id="radioIllustration"
                        onChange={handleChange}
                    />
                    <label className='flex__label' htmlFor="radioIllustration">Illustration</label>
                    <input
                        className='flex__radio'
                        type="radio"
                        value="Motion"
                        name="radio"
                        id="radioMotion"
                        onChange={handleChange}
                    />
                    <label className='flex__label' htmlFor="radioMotion">Motion</label>
                </div>
                <div className={styles.flex__selection}>
                    <select
                        className={styles.flex__select}
                        value={val}
                        onChange={handleChange}
                    >
                        <option
                            className={styles.flex__option}
                            value=""
                        >ShowAll</option>
                        <option
                            className={styles.flex__option}
                            value="Design"
                        >Design</option>
                        <option
                            className={styles.flex__option}
                            value="Branding"
                        >Branding</option>
                        <option
                            className={styles.flex__option}
                            value="Illustration"
                        >Illustration</option>
                        <option
                            className={styles.flex__option}
                            value="Motion"
                        >Motion</option>
                    </select>
                </div>
                <div className={styles.flex__cards}>
                    {filteredList.slice(0, i).map((item, idx) => (
                        <button onClick={handleToggle} className='flex__card' key={idx} id={item.__id}>
                            <Image
                                priority
                                src={item.path}
                                width={width > 1040 ? 371 : 330}
                                height={417}
                                className={styles.flex__image}
                            />
                            <div className={styles.flex__box}>
                                <div onClick={handleChangeDiv} className={styles.flex__type}>{item.type}</div>
                                <span className={styles.flex__title}>{item.title}</span>
                            </div>
                        </button>
                    ))}
                </div>
                <button
                    className={styles.flex__button}
                    onClick={handleClick}
                    id="buttonMore"
                >Load More</button>
            </div>
        </div>
    )
}
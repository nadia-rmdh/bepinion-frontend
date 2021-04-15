import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import { memo } from 'react';
import { useBalance } from '../../../../hooks/useBalance';
import { useMemo } from 'react';

function Countdown({ className, useShowWhileScroll = true }) {
    const { loading, data } = useBalance();
    const expiredAt = useMemo(() => data.expired_at, [data])
    const myBalance = useMemo(() => data?.balance ?? 0, [data])
    const isExpired = useMemo(() => data?.isExpired, [data])
    const type = useMemo(() => data?.token_type, [data])
    const [timeLeft, setTimeLeft] = useState(null);
    const [scrolling, setScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft);
        }, 1000);
        return () => clearTimeout(timer);
    });

    useEffect(() => {
        const onScroll = e => {
            setScrollTop(e.target.documentElement.scrollTop);
            setScrolling(e.target.documentElement.scrollTop > scrollTop);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop]);

    const calculateTimeLeft = () => {
        let difference = +new Date(expiredAt) - +new Date();

        if (difference > 0) {
            setTimeLeft({
                hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
                jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
                menit: Math.floor((difference / 1000 / 60) % 60),
                detik: Math.floor((difference / 1000) % 60)
            })
        }
    }

    return (
        <>
            {timeLeft?.hari < 30 && (myBalance || !isExpired) ?
                <div className={`recruitment-header ${className} ${scrolling ? 'hide' : 'show'}`}>
                    <div className={`recruitment-item ${timeLeft && timeLeft?.hari ? 'long' : 'short'} `}>
                        <div className="my-auto" disabled={true}>
                            {loading ?
                                <Spinner size="sm" color="primary" className="my-auto" />
                                :
                                <>
                                    <TimerDisplay interval={timeLeft} type={type} />
                                </>
                            }
                        </div>
                    </div>
                </div>
                :
                ''
            }
        </>
    )
}

const TimerDisplay = memo(({ interval, type }) => {
    const handleDisplay = () => {
        if (interval?.hari <= 30 && interval?.hari > 0) {
            return (
                <>
                    <span className="mr-1">
                        {interval?.hari ?? 0} Hari
                    </span>
                </>
            )
        } else if (interval?.hari === 0 && interval?.jam > 0) {
            return (
                <>
                    <span className="mr-1">
                        {interval?.jam ?? 0} Jam
                    </span>
                </>
            )
        } else if (interval?.hari === 0 && interval?.jam === 0) {
            return (
                <>
                    <span className="mr-1">
                        {interval?.menit ?? 0} Menit
                    </span>
                </>
            )
        } else if (interval?.hari === 0 && interval?.jam === 0 && interval?.menit === 0) {
            return (
                <>
                    <span className="mr-1">
                        {interval?.detik ?? 0} Detik
                    </span>
                </>
            )
        }
    }
    return (
        <div>
            {!interval ?
                <Spinner size="sm" color="primary" className="my-auto" />
                :
                <>
                    {type === "trial" ? "Waktu Trial Anda akan habis dalam" : "Token kadaluarsa dalam"} {handleDisplay()}
                </>
            }
        </div >
    )
})

export default Countdown
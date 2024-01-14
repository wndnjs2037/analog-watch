import React, { useEffect } from "react";
import { useAtom } from "jotai";
import Tooltip from "../tooltip/Tooltip";
import "./AnalogClock.css";
import {
  secondAtom,
  minuteAtom,
  hourAtom,
  tooltipPositionAtom,
  ampmAtom,
} from "../../atoms/clockAtoms";

const AnalogClock: React.FC = () => {
  const [second, setSecond] = useAtom(secondAtom);
  const [minute, setMinute] = useAtom(minuteAtom);
  const [hour, setHour] = useAtom(hourAtom);
  const [tooltipPosition, setTooltipPosition] = useAtom(tooltipPositionAtom);
  const [ampm, setAmpm] = useAtom(ampmAtom);

  // 툴팁 출력용 마우스 인식 핸들러
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - svgRect.left;
    const mouseY = e.clientY - svgRect.top;

    if (
      Math.pow(mouseX - 100, 2) + Math.pow(mouseY - 100, 2) >
      Math.pow(90, 2)
    ) {
      setTooltipPosition({ x: 0, y: 0 });
    } else {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // 시계 눈금 랜더링
  const renderTicks = () => {
    const ticks = [];
    for (let i = 0; i < 60; i++) {
      const isBold = i % 5 === 0;
      const angle = (i / 60) * 360;
      const tickHeight = isBold ? 10 : 5;
      const tickClass = isBold ? "bold-tick" : "tick";

      ticks.push(
        <line
          key={i}
          x1="100"
          y1="10"
          x2="100"
          y2={10 + tickHeight}
          transform={`rotate(${angle} 100 100)`}
          className={tickClass}
        />
      );
    }
    return ticks;
  };

  // 시,분,초 갱신
  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();

      setHour(() => (h % 12) + m / 60);
      setMinute(() => m + s / 60);
      setSecond(() => s);

      // 오전, 오후 갱신
      const newAmpm = h >= 12 ? "오후" : "오전";
      setAmpm(newAmpm);
    };

    // 초 단위 갱신
    const secondIntervalId = setInterval(() => {
      setSecond((prev) => (prev + 1) % 60);
    }, 1000);

    // 분 단위 갱신
    const minuteIntervalId = setInterval(() => {
      setMinute((prev) => (prev + 1) % 60);
    }, 60000);

    // 시간 단위 갱신
    const hourIntervalId = setInterval(() => {
      setHour((prev) => {
        const movePerInterval = 1 / 5;
        return (prev + movePerInterval) % 12;
      });
    }, 60000 * 12);

    updateClock();

    return () => {
      clearInterval(secondIntervalId);
      clearInterval(minuteIntervalId);
      clearInterval(hourIntervalId);
    };
  }, [setHour, setMinute, setSecond, setAmpm]);

  // 툴팁 시간 관리
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const svgRect = document.querySelector(".clock")?.getBoundingClientRect();
      if (!svgRect) return;

      const mouseX = e.clientX - svgRect.left;
      const mouseY = e.clientY - svgRect.top;

      if (
        Math.pow(mouseX - 100, 2) + Math.pow(mouseY - 100, 2) >
        Math.pow(90, 2)
      ) {
        setTooltipPosition({ x: 0, y: 0 });
      } else {
        setTooltipPosition({ x: e.clientX, y: e.clientY });

        // 툴팁 시간 데이터 업데이트
        const now = new Date();
        setSecond(now.getSeconds());
        setMinute(now.getMinutes() + now.getSeconds() / 60);
        setHour((now.getHours() % 12) + now.getMinutes() / 60);
        setAmpm(now.getHours() >= 12 ? "오후" : "오전");
      }
    };

    // 마우스 이벤트 리스너 등록
    window.addEventListener("mousemove", handleMouseMove);

    // 컴포넌트 언마운트시 리스너 제거
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setTooltipPosition, setSecond, setMinute, setHour, setAmpm]);

  return (
    <div className="clock-wrap">
      <svg
        width="200"
        height="200"
        onMouseMove={handleMouseMove}
        className="clock"
      >
        <circle cx="100" cy="100" r="90" className="clock-face" />
        {renderTicks()}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="50"
          transform={`rotate(${hour * 30} 100 100)`}
          className="hour-hand"
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          transform={`rotate(${minute * 6} 100 100)`}
          className="minute-hand"
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="20"
          transform={`rotate(${second * 6} 100 100)`}
          className="second-hand"
        />
      </svg>
      {tooltipPosition.x !== 0 && tooltipPosition.y !== 0 && (
        <Tooltip
          time={`${ampm} ${String(Math.floor(hour)).padStart(2, "0")}:${String(
            Math.floor(minute)
          ).padStart(2, "0")}:${String(Math.floor(second)).padStart(2, "0")}`}
          position={tooltipPosition}
        />
      )}
    </div>
  );
};

export default AnalogClock;

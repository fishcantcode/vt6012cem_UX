import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface CarouselProps {
  children: React.ReactNode[];
  dots?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  infinite?: boolean;
  slidesToShow?: number | { mobile?: number; tablet?: number; desktop?: number };
  slidesToScroll?: number | { mobile?: number; tablet?: number; desktop?: number };
  className?: string;
  style?: React.CSSProperties;
  highlightMode?: boolean;
  slideWidth?: string | number; 
}

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 8,
  boxShadow: theme.shadows[2],
}));

const CarouselWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'visible',
  marginBottom: theme.spacing(2),
}));

const SlideContainer = styled(Box)<{ focusMode?: boolean }>(({ theme, focusMode }) => ({
  display: 'flex',
  transition: 'transform 0.3s ease-in-out',
  '& > *': {
    flex: '0 0 auto',
    transition: 'transform 0.3s ease-in-out, filter 0.3s ease-in-out',
    '&:nth-child(2n)': {
      filter: focusMode ? 'brightness(0.7)' : 'none',
    },
  },
}));

const DotIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

const Dot = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  width:  12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[400],
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  opacity: 0.5,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    opacity: 1,
  },
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  transition: 'opacity 0.3s',
  '&:hover': {
    opacity: 0.9,
  },
}));

const MuiCarousel = ({
  children,
  dots = true,
  autoplay = false,
  autoplaySpeed = 3000,
  infinite = false,
  slidesToShow,
  slidesToScroll,
  className,
  style,
  highlightMode = false,
  slideWidth,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastUserInteraction, setLastUserInteraction] = useState(Date.now());
  const [autoPlayTimer, setAutoPlayTimer] = useState<NodeJS.Timeout | null>(null);
  const totalSlides = React.Children.count(children);

  const cloneCount = infinite ? (typeof slidesToShow === 'number' ? slidesToShow : 1) : 0;
  const slidesArray = React.Children.toArray(children);
  const extendedSlides = infinite
    ? [
        ...slidesArray.slice(-cloneCount),
        ...slidesArray,
        ...slidesArray.slice(0, cloneCount),
      ]
    : slidesArray;
  const realSlideStart = infinite ? cloneCount : 0;
  const realSlideEnd = infinite ? cloneCount + slidesArray.length - 1 : slidesArray.length - 1;

  const handleAutoPlay = () => {
    if (!autoplay) return;

    setAutoPlayTimer(setTimeout(() => {
      const nextIndex = (currentIndex + 1) % totalSlides;
      setCurrentIndex(nextIndex);
      setLastUserInteraction(Date.now());
    }, autoplaySpeed));
  };

  const resetAutoPlay = () => {
    if (autoPlayTimer) {
      clearTimeout(autoPlayTimer);
      setAutoPlayTimer(null);
    }
    handleAutoPlay();
  };

  const theme = useTheme();

  useEffect(() => {
    if (autoplay) {
      handleAutoPlay();
    }
  }, [autoplay]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlidesToShow = typeof slidesToShow === 'object'
    ? (isMobile ? slidesToShow.mobile : isTablet ? slidesToShow.tablet : slidesToShow.desktop) ?? 1
    : slidesToShow ?? 1;

  const effectiveSlidesToShow = Math.min(currentSlidesToShow, slidesArray.length);

  const getTranslateX = () => {
    if (!infinite) {
      return currentIndex * (100 / effectiveSlidesToShow);
    }

    return (currentIndex + cloneCount - Math.floor(effectiveSlidesToShow / 2)) * (100 / effectiveSlidesToShow);
  };

  const getActiveDotIndex = () => {
    const adjustedIndex = currentIndex
    return adjustedIndex % children.length;
  };

  const getCurrentSlidesToScroll = () => {
    if (!slidesToScroll) return 1;
    
    if (typeof slidesToScroll === 'number') {
      return slidesToScroll;
    }
    
    if (isMobile) {
      return slidesToScroll.mobile ?? 1;
    } else if (isTablet) {
      return slidesToScroll.tablet ?? 1;
    } else {
      return slidesToScroll.desktop ?? 1;
    }
  };

  const moveToNext = () => {
    const slidesToScrollValue = getCurrentSlidesToScroll() ;
    setLastUserInteraction(Date.now());
    if (infinite) {
      setCurrentIndex((prev) => prev + slidesToScrollValue);
    } else {
      setCurrentIndex((prev) => (prev + slidesToScrollValue) % slidesArray.length);
    }
    resetAutoPlay();
  };

  const moveToPrev = () => {
    const slidesToScrollValue = getCurrentSlidesToScroll();
    setLastUserInteraction(Date.now());
    if (infinite) {
      setCurrentIndex((prev) => prev - slidesToScrollValue);
    } else {
      setCurrentIndex((prev) => (prev - slidesToScrollValue + slidesArray.length) % slidesArray.length);
    }
    resetAutoPlay();
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!infinite) return;
    if (currentIndex < 0) {
      setTimeout(() => setCurrentIndex(slidesArray.length - 1), 300);
    } else if (currentIndex >= slidesArray.length) {
      setTimeout(() => setCurrentIndex(0), 300);
    }
  }, [currentIndex, infinite, slidesArray.length]);

  const renderSlides = () => {
    return extendedSlides.map((child, index) => {
      let isActive = false;
      if (highlightMode) {
        const centerIndex = currentIndex + (infinite ? cloneCount : 0);
        const visibleStart = centerIndex - Math.floor(effectiveSlidesToShow / 2);
        const visibleEnd = centerIndex + Math.floor((effectiveSlidesToShow - 1) / 2);
        isActive = index >= visibleStart && index <= visibleEnd && index === centerIndex;
      }
      return (
        <Box
          key={index}
          sx={{
            width: slideWidth || `${100 / effectiveSlidesToShow}%`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s, filter 0.3s',
            ...(highlightMode && !isActive
              ? {
                  transform: 'scale(0.8)',
                  filter: 'brightness(0.6)',
                  zIndex: 1,
                }
              : highlightMode && isActive
              ? {
                  transform: 'scale(1)',
                  filter: 'none',
                  zIndex: 2,
                }
              : {}),
          }}
        >
          {child}
        </Box>
      );
    });
  };

  return (
    <CarouselWrapper className={className} style={style}>
      <CarouselContainer>
        <SlideContainer
          ref={containerRef}
          sx={{
            transform: `translateX(-${getTranslateX()}%)`,
          }}
        >
          {renderSlides()}
        </SlideContainer>

        {dots && (
        <DotIndicator>
          {slidesArray.map((_, index) => (
            <Dot
              key={index}
              active={getActiveDotIndex() === index}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </DotIndicator>
      )}
      </CarouselContainer>
      <NavigationButton
        size="small"
        onClick={moveToPrev}
        sx={{ left: theme.spacing(2) }}
      >
        <ArrowBackIos />
      </NavigationButton>

      <NavigationButton
        size="small"
        onClick={moveToNext}
        sx={{ right: theme.spacing(2) }}
      >
        <ArrowForwardIos />
      </NavigationButton>
    </CarouselWrapper>
  );
};

export default MuiCarousel;
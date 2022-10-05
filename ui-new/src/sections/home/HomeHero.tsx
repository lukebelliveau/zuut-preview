import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Link, Container, Typography, Stack, StackProps } from '@mui/material';
// components

import Iconify from '../../components/Iconify';

import { MotionContainer, varFade } from '../../components/animate';
import { PATH_PLAYGROUND } from 'src/routes/paths';
import { useQueryItemsNavConfig } from 'src/layouts/playground/toolbar/NavConfig';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  height: '100vh',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props: StackProps) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left',
    },
  })
);

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '48vh',
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  useQueryItemsNavConfig();

  return (
    <MotionContainer>
      <RootStyle>
        <HeroOverlayStyle
          alt="overlay"
          src="/assets/overlay.svg"
          variants={varFade().inHalfOpaque}
        />

        <HeroImgStyle alt="hero" src="/assets/landing.svg" variants={varFade().inUp} />

        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h1" sx={{ color: 'primary.main' }}>
                ZUUT&nbsp;
              </Typography>
              <Typography variant="h3" sx={{ color: 'common.white' }}>
                Grow Playground
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography variant="h4" sx={{ color: 'common.white' }}>
                Design your grow. <br /> Pick your parts. <br />
                Share with the Community.
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: 'common.white' }}>
                ZUUT empowers you to design the perfect grow that is right for you, to choose top
                rated compatible parts for the cheapest prices, and to share your experience with
                the community.
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_PLAYGROUND.general.demo}
                startIcon={<Iconify icon={'eva:flash-fill'} width={20} height={20} />}
              >
                Open Demo Playground
              </Button>
            </m.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </MotionContainer>
  );
}

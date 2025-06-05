import * as React from "react";
import { Avatar, Box, Grid, Stack } from "@mui/material";
import TypographyComp from "../Common/TypographyComp";
// import TypographyComp from "../../../common/TypographyComp";

const titleTextColor = '#213b2d';
const logoTextColor = '#213b2d';

export default function HeaderReportForm(props) {
  const { title, subTitle, subTitle2, date } = props;
  const logo = '/images/logo.png';
  const searchForm = () => {
    return (
      <>
        <Grid
          container
          direction="row"
          spacing={0.1}
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Grid item xs={1.5}>
            <Avatar src={logo} sx={{ width: 80, height: 80, margin: "auto" }}>
              A
            </Avatar>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="column"
              spacing={0.1}
              sx={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <TypographyComp
                variant="subtitle1"
                fontWeight="bold"
                textcolor={titleTextColor}
              >
                {`Iglesia Cristiana Evangélica`}
              </TypographyComp>
              <TypographyComp
                variant="h6"
                fontWeight="bold"
                textcolor={titleTextColor}
              >
                {`"ALTO PAGADOR"`}
              </TypographyComp>
            </Stack>
          </Grid>
          <Grid item xs={2} >
            .
          </Grid>
          <Grid item xs={2.5} >
            {date &&

              <TypographyComp
                variant="caption"
                // fontWeight="bold"
                textcolor={titleTextColor}
              >
                {`Fecha : `}
              </TypographyComp>}
            <TypographyComp
              variant="caption"
              fontWeight="bold"
              textcolor={titleTextColor}
            >
              {date}
            </TypographyComp>
          </Grid>
        </Grid>

        <Grid container spacing={0} alignItems="center" direction="row" >
          <Grid item xs={5}
            direction="row" sx={{
              justifyContent: "center",
              alignItems: "end",
            }}
            display="flex"
          >
            <Avatar src={logo} sx={{ width: 80, height: 80, margin: "auto" }}>
              A
            </Avatar>
            <Stack
              direction="column"
              spacing={0.5}
              sx={{
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >

              <TypographyComp
                variant="h6"
                fontWeight="bold"
                textcolor={titleTextColor}
              >
                {`Iglesia Cristiana Evangélica`}
              </TypographyComp>
              <TypographyComp
                variant="h6"
                fontWeight="bold"
                textcolor={titleTextColor}
              >
                {`"ALTO PAGADOR"`}
              </TypographyComp>
            </Stack>
          </Grid>
          <Grid item xs={7}>
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {date &&
                <>
                  <TypographyComp
                    variant="h8"
                    // fontWeight="bold"
                    textcolor={titleTextColor}
                  >
                    {`Fecha:`}
                  </TypographyComp>
                  <TypographyComp
                    variant="h8"
                    fontWeight="bold"
                    textcolor={titleTextColor}
                  >
                    {date}
                  </TypographyComp>
                </>
              }
            </Stack>
          </Grid>
          <Grid item xs={12}></Grid>
          {/* <Grid item xs={12}></Grid> */}
        </Grid>
        {title &&
          <Box style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Stack direction="column" justifyContent="center" spacing={1}>
              <TypographyComp
                variant="h6"
                fontWeight="bold"
                textcolor={titleTextColor}
              >
                {title}
              </TypographyComp>
              <TypographyComp
                variant="h8"
                fontWeight="bold"
                textcolor={titleTextColor}
              >
                {subTitle}
              </TypographyComp>
              <TypographyComp
                variant="h8"
                fontWeight="bold"
                textcolor={titleTextColor}
              >
                {subTitle2}
              </TypographyComp>
              <div> .</div>
            </Stack>
          </Box>
        }

      </>
    )
  }
  return (
    <>{searchForm()}</>
  )
}
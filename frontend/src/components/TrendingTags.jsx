import React from 'react'
import { Box,Stack, Card } from "@mui/material"
import { trending } from '../utils/trendingTopics'

const TrendingTags = () => {
  return (
    <div className="mobFirst w-25">
       <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "fit-content",
        position: "sticky",
        top: "10%",
      }}
     
    >
      <Card
        sx={{
          width: "90%",
          padding: "1em",
          borderRadius: "2em",
          marginTop:"2em"
        }}
      >
        <Stack row="column">
          <h4 className="fw-bold mb-4">Trending Searches</h4>
          {trending.map((trend, i) => (
            <div key={i}>
              <h6 className="fw-bold">
                #{trend.topic}
                <p className="text-muted">{trend.searches}k Searches</p>
              </h6>
            </div>
          ))}
        </Stack>
      </Card>
    </Box>
    </div>
   
  );
}

export default TrendingTags
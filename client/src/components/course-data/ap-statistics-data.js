// File: client/src/components/course-data/ap-statistics-data.js

export const unitData = {
  unit1: {
    title: "Unit 1: Exploring One-Variable Data",
    description: "Learn how to describe and analyze single-variable datasets using graphical and numerical summaries.",
    bigIdeas: ["VAR", "UNC"],
    examWeight: "15–23%",
    pacing: "~18 class periods",
    topics: [
      { id: "1.1", title: "Introducing Statistics", description: "What can we learn from data?", skills: ["1.A"] },
      { id: "1.2", title: "The Language of Variation: Variables", description: "Understanding categorical and quantitative variables.", skills: ["2.A"] },
      { id: "1.3", title: "Representing a Categorical Variable with Tables", description: "Frequency tables and relative frequency tables.", skills: ["2.A", "2.B"] },
      { id: "1.4", title: "Representing a Categorical Variable with Graphs", description: "Bar charts, pie charts, and their interpretations.", skills: ["2.B"] },
      { id: "1.5", title: "Representing a Quantitative Variable with Graphs", description: "Dotplots, stemplots, histograms, and cumulative frequency plots.", skills: ["2.A", "2.B"] },
      { id: "1.6", title: "Describing the Distribution of a Quantitative Variable", description: "Shape, center, variability (spread), and unusual characteristics.", skills: ["2.A"] },
      { id: "1.7", title: "Summary Statistics for a Quantitative Variable", description: "Measures of center (mean, median) and variability (standard deviation, IQR).", skills: ["2.C"] },
      { id: "1.8", title: "Graphical Representations of Summary Statistics", description: "Boxplots and their relationship to summary statistics.", skills: ["2.B"] },
      { id: "1.9", title: "Comparing Distributions of a Quantitative Variable", description: "Using back-to-back stemplots, parallel boxplots, and histograms.", skills: ["2.D"] },
      { id: "1.10", title: "The Normal Distribution", description: "Properties of normal distributions and the empirical rule.", skills: ["3.A"] },
    ],
  },
  unit2: {
    title: "Unit 2: Exploring Two-Variable Data",
    description: "Discover and analyze relationships between two variables.",
    bigIdeas: ["VAR", "DAT"],
    examWeight: "5–7%",
    pacing: "~9 class periods",
    topics: [
      { id: "2.1", title: "Introducing Statistics: Are Variables Related?", description: "Identifying response and explanatory variables.", skills: ["1.A"] },
      { id: "2.2", title: "Representing Two Categorical Variables", description: "Two-way tables, joint and marginal relative frequencies.", skills: ["2.B"] },
      { id: "2.3", title: "Statistics for Two Categorical Variables", description: "Conditional relative frequencies and association.", skills: ["2.D"] },
      { id: "2.4", title: "Representing the Relationship Between Two Quantitative Variables", description: "Creating and interpreting scatterplots.", skills: ["2.A", "2.B"] },
      { id: "2.5", title: "Correlation", description: "Calculating and interpreting the correlation coefficient.", skills: ["2.C"] },
      { id: "2.6", title: "Linear Regression Models", description: "Understanding the least-squares regression line (LSRL).", skills: ["2.B"] },
      { id: "2.7", title: "Residuals", description: "Calculating and interpreting residuals and residual plots.", skills: ["2.C"] },
      { id: "2.8", title: "Least-Squares Regression", description: "Interpreting the slope and y-intercept of the LSRL.", skills: ["2.D"] },
      { id: "2.9", title: "Analyzing Departures from Linearity", description: "Using transformations to achieve linearity.", skills: ["2.C", "2.D"] },
    ],
  },
  unit3: {
    title: "Unit 3: Collecting Data",
    description: "Master sampling methods and experimental design principles.",
    bigIdeas: ["DAT"],
    examWeight: "12–15%",
    pacing: "~11 class periods",
    topics: [
        { id: "3.1", title: "Introducing Statistics: Do the Data We Collected Tell the Truth?", description: "Understanding data collection methods.", skills: ["1.A"] },
        { id: "3.2", title: "Introduction to Planning a Study", description: "Observational studies versus experiments.", skills: ["1.C"] },
        { id: "3.3", title: "Random Sampling and Data Collection", description: "Simple random sampling, stratified, cluster, and systematic sampling.", skills: ["1.C"] },
        { id: "3.4", title: "Potential Problems with Sampling", description: "Bias in sampling methods (undercoverage, nonresponse, response bias).", skills: ["1.C"] },
        { id: "3.5", title: "Introduction to Experimental Design", description: "Treatments, control groups, experimental units, and random assignment.", skills: ["1.C"] },
        { id: "3.6", title: "Selecting an Experimental Design", description: "Completely randomized, randomized block, and matched pairs designs.", skills: ["1.C"] },
        { id: "3.7", title: "Inference and Experiments", description: "Drawing conclusions from experiments.", skills: ["4.B"] }
    ]
  },
  // ... (Units 4 through 9 would be added here in the same format)
  unit4: {
    title: "Unit 4: Probability, Random Variables, and Probability Distributions",
    description: "Build a foundation in probability theory and random variables.",
    bigIdeas: ["UNC", "VAR"],
    examWeight: "10–20%",
    pacing: "~20 class periods",
    topics: [
        { id: "4.1", title: "Introducing Statistics: Random and Non-Random Patterns?", description: "Understanding probability and simulation.", skills: ["1.B"] },
        { id: "4.2", title: "Estimating Probabilities Using Simulation", description: "Using simulation to estimate probabilities.", skills: ["3.A"] },
        { id: "4.3", title: "Introduction to Probability", description: "Basic probability rules and concepts.", skills: ["3.A"] },
        { id: "4.4", title: "Mutually Exclusive Events", description: "The addition rule for mutually exclusive events.", skills: ["3.A"] },
        { id: "4.5", title: "Conditional Probability", description: "Calculating and interpreting conditional probabilities.", skills: ["3.A"] },
        { id: "4.6", title: "Independent Events", description: "The multiplication rule for independent events.", skills: ["3.A"] },
        { id: "4.7", title: "Random Variables", description: "Discrete and continuous random variables.", skills: ["2.A"] },
        { id: "4.8", title: "Mean and Standard Deviation of Random Variables", description: "Calculating expected value and standard deviation.", skills: ["3.B"] },
        { id: "4.9", title: "Combining Random Variables", description: "Rules for the mean and variance of combined random variables.", skills: ["3.B"] },
        { id: "4.10", title: "Introduction to the Binomial Distribution", description: "Properties of the binomial distribution.", skills: ["3.A"] },
        { id: "4.11", title: "Parameters for a Binomial Distribution", description: "Calculating binomial probabilities.", skills: ["3.A"] },
        { id: "4.12", title: "The Geometric Distribution", description: "Properties of the geometric distribution.", skills: ["3.A"] }
    ]
  },
  unit5: {
    title: "Unit 5: Sampling Distributions",
    description: "Understand the behavior of sample statistics and sampling variability.",
    bigIdeas: ["UNC", "VAR"],
    examWeight: "7–12%",
    pacing: "~13 class periods",
    topics: [
      { id: "5.1", title: "Introducing Statistics: Why Is My Sample Not Like Yours?", description: "Understanding sampling variability.", skills: ["1.B"] },
      { id: "5.2", title: "The Normal Distribution, Revisited", description: "Advanced applications of the normal distribution.", skills: ["3.A"] },
      { id: "5.3", title: "The Central Limit Theorem", description: "The distribution of sample means and proportions.", skills: ["3.C"] },
      { id: "5.4", title: "Biased and Unbiased Point Estimates", description: "Properties of estimators.", skills: ["3.B"] },
      { id: "5.5", title: "Sampling Distributions for Sample Proportions", description: "Mean and standard deviation of sample proportions.", skills: ["3.C"] },
      { id: "5.6", title: "Sampling Distributions for Differences in Sample Proportions", description: "Comparing two proportions.", skills: ["3.C"] },
      { id: "5.7", title: "Sampling Distributions for Sample Means", description: "Mean and standard deviation of sample means.", skills: ["3.C"] },
      { id: "5.8", title: "Sampling Distributions for Differences in Sample Means", description: "Comparing two means.", skills: ["3.C"] }
    ]
  },
  unit6: {
    title: "Unit 6: Inference for Categorical Data: Proportions",
    description: "Make statistical inferences about population proportions.",
    bigIdeas: ["UNC", "DAT"],
    examWeight: "12–15%",
    pacing: "~16 class periods",
    topics: [
      { id: "6.1", title: "Introducing Statistics: Why Be Normal?", description: "Introduction to statistical inference.", skills: ["1.D"] },
      { id: "6.2", title: "Constructing a Confidence Interval for a Population Proportion", description: "One-sample z-interval for proportions.", skills: ["4.A"] },
      { id: "6.3", title: "Justifying a Claim Based on a Confidence Interval", description: "Interpreting confidence intervals.", skills: ["4.B"] },
      { id: "6.4", title: "Setting Up a Test for a Population Proportion", description: "Hypothesis test setup and conditions.", skills: ["4.C"] },
      { id: "6.5", title: "Interpreting p-Values", description: "Making conclusions based on p-values.", skills: ["4.D"] },
      { id: "6.6", title: "Potential Errors in Testing", description: "Type I and Type II errors and power.", skills: ["4.E"] },
      { id: "6.7", title: "Confidence Intervals for the Difference of Two Proportions", description: "Two-sample z-interval for proportions.", skills: ["4.A"] },
      { id: "6.8", title: "Justifying a Claim Based on a Confidence Interval for a Difference of Proportions", description: "Interpreting two-sample intervals.", skills: ["4.B"] },
      { id: "6.9", title: "Setting Up a Test for the Difference of Two Proportions", description: "Two-sample test setup.", skills: ["4.C"] },
      { id: "6.10", title: "Carrying Out a Test for the Difference of Two Proportions", description: "Two-sample z-test for proportions.", skills: ["4.D"] }
    ]
  },
  unit7: {
    title: "Unit 7: Inference for Quantitative Data: Means",
    description: "Make statistical inferences about population means.",
    bigIdeas: ["UNC", "VAR", "DAT"],
    examWeight: "10–18%",
    pacing: "~16 class periods",
    topics: [
      { id: "7.1", title: "Introducing Statistics: Should I worry about the T?", description: "Introduction to t-procedures.", skills: ["1.D"] },
      { id: "7.2", title: "Constructing a Confidence Interval for a Population Mean", description: "One-sample t-interval for means.", skills: ["4.A"] },
      { id: "7.3", title: "Justifying a Claim Based on a Confidence Interval for a Mean", description: "Interpreting t-intervals.", skills: ["4.B"] },
      { id: "7.4", title: "Setting Up a Test for a Population Mean", description: "One-sample t-test setup.", skills: ["4.C"] },
      { id: "7.5", title: "Carrying Out a Test for a Population Mean", description: "One-sample t-test procedures.", skills: ["4.D"] },
      { id: "7.6", title: "Confidence Intervals for the Difference of Two Means", description: "Two-sample t-interval for means.", skills: ["4.A"] },
      { id: "7.7", title: "Justifying a Claim Based on a Confidence Interval for a Difference of Means", description: "Interpreting two-sample t-intervals.", skills: ["4.B"] },
      { id: "7.8", title: "Setting Up a Test for the Difference of Two Means", description: "Two-sample t-test setup.", skills: ["4.C"] },
      { id: "7.9", title: "Carrying Out a Test for the Difference of Two Means", description: "Two-sample t-test procedures.", skills: ["4.D"] },
      { id: "7.10", title: "Inference for Paired Data: t-Procedures", description: "Matched pairs t-procedures.", skills: ["4.A", "4.C"] }
    ]
  },
  unit8: {
    title: "Unit 8: Inference for Categorical Data: Chi-Square",
    description: "Test relationships and goodness of fit for categorical data.",
    bigIdeas: ["UNC", "DAT"],
    examWeight: "2–5%",
    pacing: "~8 class periods",
    topics: [
      { id: "8.1", title: "Introducing Statistics: Are My Results Unexpected?", description: "Introduction to chi-square tests.", skills: ["1.E"] },
      { id: "8.2", title: "Setting Up a Chi-Square Goodness of Fit Test", description: "Testing goodness of fit to a distribution.", skills: ["4.C"] },
      { id: "8.3", title: "Carrying Out a Chi-Square Test for Goodness of Fit", description: "Conducting goodness of fit tests.", skills: ["4.D"] },
      { id: "8.4", title: "Expected Counts in Two-Way Tables", description: "Calculating expected counts.", skills: ["3.B"] },
      { id: "8.5", title: "Setting Up a Chi-Square Test for Homogeneity or Independence", description: "Testing homogeneity or independence.", skills: ["4.C"] },
      { id: "8.6", title: "Carrying Out a Chi-Square Test for Homogeneity or Independence", description: "Conducting homogeneity or independence tests.", skills: ["4.D"] }
    ]
  },
  unit9: {
    title: "Unit 9: Inference for Quantitative Data: Slopes",
    description: "Make inferences about regression slopes and relationships.",
    bigIdeas: ["UNC", "DAT"],
    examWeight: "2–5%",
    pacing: "~8 class periods",
    topics: [
      { id: "9.1", title: "Introducing Statistics: Do My Data Fit a Linear Model?", description: "Introduction to inference for slopes.", skills: ["1.F"] },
      { id: "9.2", title: "Confidence Intervals for the Slope of a Regression Model", description: "t-interval for regression slope.", skills: ["4.A"] },
      { id: "9.3", title: "Justifying a Claim Based on a Confidence Interval for a Slope", description: "Interpreting slope intervals.", skills: ["4.B"] },
      { id: "9.4", title: "Setting Up a Test for the Slope of a Regression Model", description: "Hypothesis test for slope setup.", skills: ["4.C"] },
      { id: "9.5", title: "Carrying Out a Test for the Slope of a Regression Model", description: "t-test for regression slope.", skills: ["4.D"] },
      { id: "9.6", title: "Skills Focus: Selecting the Appropriate Inference Procedure", description: "Comprehensive review of all inference procedures.", skills: ["1.D", "1.E", "1.F"] }
    ]
  }
};
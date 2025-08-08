// File: pages/courses/ap-statistics/[unit].js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CourseLayout from '../../../components/CourseLayout';

const APStatisticsUnit = () => {
  const router = useRouter();
  const { unit } = router.query;
  const [completedTopics, setCompletedTopics] = useState(new Set());

  // Complete unit data for all 9 AP Statistics units
  const unitData = {
    unit1: {
      title: "Exploring One-Variable Data",
      description: "Learn to describe and analyze single variable datasets using graphical and numerical summaries",
      bigIdeas: ["Variation and Distribution (VAR)", "Patterns and Uncertainty (UNC)"],
      examWeight: "15-23%",
      classePeriods: "14-16",
      topics: [
        {
          id: "1.1",
          title: "Introducing Statistics: What Can We Learn from Data?",
          description: "Introduction to statistical thinking and data analysis",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "1.2", 
          title: "The Language of Variation: Variables",
          description: "Understanding different types of variables and data",
          skills: ["2.A"],
          estimatedTime: "1 period"
        },
        {
          id: "1.3",
          title: "Representing a Categorical Variable with Tables", 
          description: "Creating and interpreting frequency tables",
          skills: ["2.B"],
          estimatedTime: "1 period"
        },
        {
          id: "1.4",
          title: "Representing a Categorical Variable with Graphs",
          description: "Creating bar charts and pie charts",
          skills: ["2.B"], 
          estimatedTime: "1 period"
        },
        {
          id: "1.5",
          title: "Representing a Quantitative Variable with Graphs",
          description: "Histograms, dotplots, and stem-and-leaf plots",
          skills: ["2.B"],
          estimatedTime: "2 periods"
        },
        {
          id: "1.6",
          title: "Describing the Distribution of a Quantitative Variable",
          description: "Shape, center, variability, and outliers (SOCS)",
          skills: ["2.D"],
          estimatedTime: "2 periods"
        },
        {
          id: "1.7",
          title: "Summary Statistics for a Quantitative Variable", 
          description: "Mean, median, standard deviation, and quartiles",
          skills: ["2.D"],
          estimatedTime: "2 periods"
        },
        {
          id: "1.8",
          title: "Graphical Representations of Summary Statistics",
          description: "Boxplots and their interpretation",
          skills: ["2.B", "2.D"],
          estimatedTime: "2 periods"
        },
        {
          id: "1.9",
          title: "Comparing Distributions of a Quantitative Variable",
          description: "Comparing groups using graphics and statistics",
          skills: ["2.D"],
          estimatedTime: "2 periods"
        },
        {
          id: "1.10",
          title: "The Normal Distribution",
          description: "Properties and applications of normal distributions",
          skills: ["2.B", "3.A"],
          estimatedTime: "2 periods"
        }
      ]
    },
    unit2: {
      title: "Exploring Two-Variable Data",
      description: "Discover and analyze relationships between two variables",
      bigIdeas: ["Variation and Distribution (VAR)", "Patterns and Uncertainty (UNC)", "Data-Based Predictions (DAT)"],
      examWeight: "5-7%", 
      classePeriods: "10-11",
      topics: [
        {
          id: "2.1",
          title: "Introducing Statistics: Are Variables Related?",
          description: "Introduction to bivariate relationships",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "2.2",
          title: "Representing Two Categorical Variables",
          description: "Two-way tables and conditional distributions",
          skills: ["2.B"],
          estimatedTime: "1 period"
        },
        {
          id: "2.3",
          title: "Statistics for Two Categorical Variables",
          description: "Association and conditional percentages",
          skills: ["2.D"],
          estimatedTime: "1 period"
        },
        {
          id: "2.4",
          title: "Representing the Relationship Between Two Quantitative Variables",
          description: "Scatterplots and their interpretation",
          skills: ["2.B"],
          estimatedTime: "1 period"
        },
        {
          id: "2.5",
          title: "Correlation",
          description: "Measuring linear association strength",
          skills: ["2.D", "4.B"],
          estimatedTime: "1 period"
        },
        {
          id: "2.6",
          title: "Linear Regression Models",
          description: "Least-squares regression lines",
          skills: ["2.B"],
          estimatedTime: "1 period"
        },
        {
          id: "2.7",
          title: "Residuals", 
          description: "Analyzing model fit and outliers",
          skills: ["2.D"],
          estimatedTime: "1 period"
        },
        {
          id: "2.8",
          title: "Least Squares Regression",
          description: "Properties and interpretation of regression",
          skills: ["2.B", "4.B"],
          estimatedTime: "2 periods"
        },
        {
          id: "2.9",
          title: "Analyzing Departures from Linearity",
          description: "Non-linear relationships and transformations",
          skills: ["2.D"],
          estimatedTime: "1 period"
        }
      ]
    },
    unit3: {
      title: "Collecting Data",
      description: "Master sampling methods and experimental design principles",
      bigIdeas: ["Variation and Distribution (VAR)", "Data-Based Predictions (DAT)"],
      examWeight: "12-15%",
      classePeriods: "9-10",
      topics: [
        {
          id: "3.1",
          title: "Introducing Statistics: Do the Data We Collected Tell the Truth?",
          description: "Introduction to data collection methods",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "3.2",
          title: "Introduction to Planning a Study",
          description: "Types of studies and their purposes",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "3.3",
          title: "Random Sampling and Data Collection",
          description: "Sampling methods and their implementation",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "3.4",
          title: "Potential Problems with Sampling",
          description: "Bias, confounding, and sampling errors",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "3.5",
          title: "Introduction to Experimental Design",
          description: "Principles of experimental design",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "3.6",
          title: "Selecting an Experimental Design",
          description: "Completely randomized, randomized block, and matched pairs",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "3.7",
          title: "Inference and Experiments",
          description: "Causation vs correlation and scope of inference",
          skills: ["4.B"],
          estimatedTime: "3 periods"
        }
      ]
    },
    unit4: {
      title: "Probability, Random Variables, and Probability Distributions",
      description: "Build foundation in probability theory and random variables",
      bigIdeas: ["Variation and Distribution (VAR)", "Patterns and Uncertainty (UNC)"],
      examWeight: "10-20%",
      classePeriods: "18-20", 
      topics: [
        {
          id: "4.1",
          title: "Introducing Statistics: Random and Non-Random Patterns?",
          description: "Introduction to randomness and patterns",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "4.2",
          title: "Estimating Probabilities Using Simulation",
          description: "Using simulation to estimate probabilities",
          skills: ["3.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "4.3",
          title: "Introduction to Probability",
          description: "Basic probability concepts and rules",
          skills: ["3.A", "4.B"],
          estimatedTime: "3 periods"
        },
        {
          id: "4.4",
          title: "Mutually Exclusive Events",
          description: "Addition rule for mutually exclusive events",
          skills: ["4.B"],
          estimatedTime: "1 period"
        },
        {
          id: "4.5",
          title: "Conditional Probability",
          description: "Conditional probability and multiplication rule",
          skills: ["3.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "4.6",
          title: "Independent Events and Unions of Events",
          description: "Independence and general addition rule",
          skills: ["3.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "4.7",
          title: "Introduction to Random Variables and Probability Distributions",
          description: "Discrete random variables and probability distributions",
          skills: ["2.B"],
          estimatedTime: "2 periods"
        },
        {
          id: "4.8",
          title: "Mean and Standard Deviation of Random Variables",
          description: "Expected value and variance calculations",
          skills: ["3.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "4.9",
          title: "Combining Random Variables",
          description: "Linear combinations of random variables",
          skills: ["3.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "4.10",
          title: "Introduction to the Binomial Distribution",
          description: "Binomial probability distributions",
          skills: ["3.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "4.11",
          title: "Parameters for a Binomial Distribution",
          description: "Mean and standard deviation of binomial distributions",
          skills: ["3.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "4.12",
          title: "The Geometric Distribution",
          description: "Geometric probability distributions",
          skills: ["3.A"],
          estimatedTime: "3 periods"
        }
      ]
    },
    unit5: {
      title: "Sampling Distributions",
      description: "Understand the behavior of sample statistics and sampling variability",
      bigIdeas: ["Variation and Distribution (VAR)", "Patterns and Uncertainty (UNC)"],
      examWeight: "7-12%",
      classePeriods: "10-12",
      topics: [
        {
          id: "5.1",
          title: "Introducing Statistics: Why Is My Sample Not Like Yours?",
          description: "Introduction to sampling variability",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "5.2",
          title: "The Normal Distribution, Revisited",
          description: "Properties and applications of normal distributions",
          skills: ["3.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "5.3",
          title: "The Central Limit Theorem",
          description: "Distribution of sample means and proportions",
          skills: ["3.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "5.4",
          title: "Biased and Unbiased Point Estimates",
          description: "Properties of estimators",
          skills: ["4.B", "3.A"],
          estimatedTime: "1 period"
        },
        {
          id: "5.5",
          title: "Sampling Distributions for Sample Proportions",
          description: "Distribution of sample proportions",
          skills: ["3.A", "4.B"],
          estimatedTime: "3 periods"
        },
        {
          id: "5.6",
          title: "Sampling Distributions for Differences in Sample Proportions",
          description: "Comparing two proportions",
          skills: ["3.A", "4.B"],
          estimatedTime: "3 periods"
        },
        {
          id: "5.7",
          title: "Sampling Distributions for Sample Means",
          description: "Distribution of sample means",
          skills: ["3.A", "4.B"],
          estimatedTime: "3 periods"
        },
        {
          id: "5.8",
          title: "Sampling Distributions for Differences in Sample Means",
          description: "Comparing two means",
          skills: ["3.A", "4.B"],
          estimatedTime: "3 periods"
        }
      ]
    },
    unit6: {
      title: "Inference for Categorical Data: Proportions",
      description: "Make statistical inferences about population proportions",
      bigIdeas: ["Variation and Distribution (VAR)", "Patterns and Uncertainty (UNC)", "Data-Based Predictions (DAT)"],
      examWeight: "12-15%",
      classePeriods: "16-18",
      topics: [
        {
          id: "6.1",
          title: "Introducing Statistics: Why Be Normal?",
          description: "Introduction to statistical inference",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "6.2",
          title: "Constructing a Confidence Interval for a Population Proportion",
          description: "One-sample z-interval for proportions",
          skills: ["4.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "6.3",
          title: "Justifying a Claim About a Population Proportion Based on a Confidence Interval",
          description: "Interpreting confidence intervals",
          skills: ["4.C"],
          estimatedTime: "1 period"
        },
        {
          id: "6.4",
          title: "Setting Up a Test for a Population Proportion",
          description: "Hypothesis test setup and conditions",
          skills: ["4.A"],
          estimatedTime: "2 periods"
        },
        {
          id: "6.5",
          title: "Carrying Out a Test for a Population Proportion",
          description: "One-sample z-test for proportions",
          skills: ["4.B"],
          estimatedTime: "3 periods"
        },
        {
          id: "6.6",
          title: "Potential Errors When Making Statistical Decisions",
          description: "Type I and Type II errors",
          skills: ["4.C"],
          estimatedTime: "2 periods"
        },
        {
          id: "6.7",
          title: "Constructing a Confidence Interval for a Difference Between Two Population Proportions",
          description: "Two-sample z-interval for proportions",
          skills: ["4.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "6.8",
          title: "Justifying a Claim About the Difference Between Two Population Proportions Based on a Confidence Interval",
          description: "Interpreting two-sample intervals",
          skills: ["4.C"],
          estimatedTime: "1 period"
        },
        {
          id: "6.9",
          title: "Setting Up a Test for the Difference Between Two Population Proportions",
          description: "Two-sample test setup",
          skills: ["4.A"],
          estimatedTime: "1 period"
        },
        {
          id: "6.10",
          title: "Carrying Out a Test for the Difference Between Two Population Proportions",
          description: "Two-sample z-test for proportions",
          skills: ["4.B"],
          estimatedTime: "3 periods"
        }
      ]
    },
    unit7: {
      title: "Inference for Quantitative Data: Means",
      description: "Make statistical inferences about population means",
      bigIdeas: ["Variation and Distribution (VAR)", "Patterns and Uncertainty (UNC)", "Data-Based Predictions (DAT)"],
      examWeight: "10-18%",
      classePeriods: "14-16",
      topics: [
        {
          id: "7.1",
          title: "Introducing Statistics: When Should We Use T-Procedures?",
          description: "Introduction to t-procedures",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "7.2",
          title: "Constructing a Confidence Interval for a Population Mean",
          description: "One-sample t-interval for means",
          skills: ["4.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "7.3",
          title: "Justifying a Claim About a Population Mean Based on a Confidence Interval",
          description: "Interpreting t-intervals",
          skills: ["4.C"],
          estimatedTime: "1 period"
        },
        {
          id: "7.4",
          title: "Setting Up a Test for a Population Mean",
          description: "One-sample t-test setup",
          skills: ["4.A"],
          estimatedTime: "1 period"
        },
        {
          id: "7.5",
          title: "Carrying Out a Test for a Population Mean",
          description: "One-sample t-test procedures",
          skills: ["4.B"],
          estimatedTime: "3 periods"
        },
        {
          id: "7.6",
          title: "Constructing a Confidence Interval for a Difference Between Two Population Means",
          description: "Two-sample t-interval for means",
          skills: ["4.A"],
          estimatedTime: "3 periods"
        },
        {
          id: "7.7",
          title: "Justifying a Claim About the Difference Between Two Population Means Based on a Confidence Interval",
          description: "Interpreting two-sample t-intervals",
          skills: ["4.C"],
          estimatedTime: "1 period"
        },
        {
          id: "7.8",
          title: "Setting Up a Test for the Difference Between Two Population Means",
          description: "Two-sample t-test setup",
          skills: ["4.A"],
          estimatedTime: "1 period"
        },
        {
          id: "7.9",
          title: "Carrying Out a Test for the Difference Between Two Population Means",
          description: "Two-sample t-test procedures",
          skills: ["4.B"],
          estimatedTime: "3 periods"
        },
        {
          id: "7.10",
          title: "Analyzing Paired Data",
          description: "Matched pairs t-procedures",
          skills: ["4.A", "4.B"],
          estimatedTime: "3 periods"
        }
      ]
    },
    unit8: {
      title: "Inference for Categorical Data: Chi-Square",
      description: "Test relationships and goodness of fit for categorical data",
      bigIdeas: ["Patterns and Uncertainty (UNC)", "Data-Based Predictions (DAT)"],
      examWeight: "2-5%",
      classePeriods: "7-8",
      topics: [
        {
          id: "8.1",
          title: "Introducing Statistics: Are Independence and Goodness of Fit Related?",
          description: "Introduction to chi-square tests",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "8.2",
          title: "Setting Up a Chi-Square Goodness of Fit Test",
          description: "Testing goodness of fit to a distribution",
          skills: ["4.A"],
          estimatedTime: "2 periods"
        },
        {
          id: "8.3",
          title: "Carrying Out a Chi-Square Goodness of Fit Test",
          description: "Conducting goodness of fit tests",
          skills: ["4.B"],
          estimatedTime: "2 periods"
        },
        {
          id: "8.4",
          title: "Setting Up a Chi-Square Test for Independence",
          description: "Testing independence of categorical variables",
          skills: ["4.A"],
          estimatedTime: "1 period"
        },
        {
          id: "8.5",
          title: "Carrying Out a Chi-Square Test for Independence",
          description: "Conducting independence tests",
          skills: ["4.B"],
          estimatedTime: "2 periods"
        },
        {
          id: "8.6",
          title: "Skills Focus: Selecting an Appropriate Inference Procedure",
          description: "Choosing the correct statistical test",
          skills: ["4.A"],
          estimatedTime: "1 period"
        }
      ]
    },
    unit9: {
      title: "Inference for Quantitative Data: Slopes",
      description: "Make inferences about regression slopes and relationships",
      bigIdeas: ["Patterns and Uncertainty (UNC)", "Data-Based Predictions (DAT)"],
      examWeight: "2-5%",
      classePeriods: "7-8",
      topics: [
        {
          id: "9.1",
          title: "Introducing Statistics: How Strong Is the Relationship?",
          description: "Introduction to inference about slopes",
          skills: ["1.A"],
          estimatedTime: "1 period"
        },
        {
          id: "9.2",
          title: "Confidence Intervals for the Slope of a Regression Model",
          description: "t-interval for regression slope",
          skills: ["4.A"],
          estimatedTime: "2 periods"
        },
        {
          id: "9.3",
          title: "Justifying a Claim About the Slope of a Regression Model Based on a Confidence Interval",
          description: "Interpreting slope intervals",
          skills: ["4.C"],
          estimatedTime: "1 period"
        },
        {
          id: "9.4",
          title: "Setting Up a Test for the Slope of a Regression Model",
          description: "Hypothesis test for slope setup",
          skills: ["4.A"],
          estimatedTime: "1 period"
        },
        {
          id: "9.5",
          title: "Carrying Out a Test for the Slope of a Regression Model",
          description: "t-test for regression slope",
          skills: ["4.B", "3.A"],
          estimatedTime: "1 period"
        },
        {
          id: "9.6",
          title: "Skills Focus: Selecting an Appropriate Inference Procedure",
          description: "Comprehensive review of all inference procedures",
          skills: ["4.A"],
          estimatedTime: "1 period"
        }
      ]
    }
  };

  const currentUnit = unitData[unit];

  if (!currentUnit) {
    return (
      <CourseLayout title="Unit Not Found">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Unit Not Found</h1>
          <p className="text-gray-600 mb-6">The requested unit could not be found.</p>
          <button 
            onClick={() => router.push('/courses/ap-statistics')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Course
          </button>
        </div>
      </CourseLayout>
    );
  }

  const toggleTopicCompletion = (topicId) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
    }
    setCompletedTopics(newCompleted);
  };

  const progress = (completedTopics.size / currentUnit.topics.length) * 100;

  return (
    <CourseLayout title={currentUnit.title}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Navigation */}
        <div className="mb-8">
          <button 
            onClick={() => router.push('/courses/ap-statistics')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to AP Statistics
          </button>
        </div>

        {/* Unit Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">{currentUnit.title}</h1>
          <p className="text-xl mb-6">{currentUnit.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="font-semibold mb-1">Exam Weight</div>
              <div className="text-2xl font-bold">{currentUnit.examWeight}</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="font-semibold mb-1">Class Periods</div>
              <div className="text-2xl font-bold">{currentUnit.classePeriods}</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="font-semibold mb-1">Progress</div>
              <div className="text-2xl font-bold">{Math.round(progress)}%</div>
            </div>
          </div>
        </div>

        {/* Big Ideas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Big Ideas Covered</h2>
          <div className="flex flex-wrap gap-3">
            {currentUnit.bigIdeas.map((idea, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                {idea}
              </span>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Topics</h2>
            <span className="text-gray-600">
              {completedTopics.size} / {currentUnit.topics.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {currentUnit.topics.map((topic, index) => {
            const isCompleted = completedTopics.has(topic.id);
            
            return (
              <div
                key={topic.id}
                className={`border-2 rounded-lg p-6 transition-all duration-300 cursor-pointer
                  ${isCompleted 
                    ? 'border-green-400 bg-green-50 hover:border-green-500' 
                    : 'border-gray-200 bg-white hover:border-blue-400 hover:shadow-md'
                  }
                `}
                onClick={() => toggleTopicCompletion(topic.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold
                        ${isCompleted ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}
                      `}>
                        {isCompleted ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          topic.id
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {topic.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-3 ml-11">
                      {topic.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 ml-11 text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="font-medium">Time:</span>
                        <span className="ml-2">{topic.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Here you would navigate to the specific topic content
                        router.push(`/courses/ap-statistics/${unit}/${topic.id}`);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Study
                    </button>
                  </div>
                </div>

                {/* Connection line to next topic */}
                {index < currentUnit.topics.length - 1 && (
                  <div className="flex justify-center mt-4">
                    <div className="w-0.5 h-6 bg-gray-300"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Unit Summary */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Unit Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Key Skills Developed:</h4>
              <ul className="text-gray-600 space-y-1">
                {[...new Set(currentUnit.topics.flatMap(topic => topic.skills))].map(skill => (
                  <li key={skill} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Skill {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Assessment Information:</h4>
              <div className="text-gray-600 space-y-1">
                <p>• Personal Progress Check available</p>
                <p>• Multiple-choice questions included</p>
                <p>• Free-response questions included</p>
                <p>• Contributes {currentUnit.examWeight} to AP Exam</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation to Next Unit */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => {
              const currentUnitNum = parseInt(unit.replace('unit', ''));
              if (currentUnitNum > 1) {
                router.push(`/courses/ap-statistics/unit${currentUnitNum - 1}`);
              }
            }}
            className="flex items-center bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
            disabled={unit === 'unit1'}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Previous Unit
          </button>
          
          <button
            onClick={() => {
              const currentUnitNum = parseInt(unit.replace('unit', ''));
              if (currentUnitNum < 9) {
                router.push(`/courses/ap-statistics/unit${currentUnitNum + 1}`);
              }
            }}
            className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={unit === 'unit9'}
          >
            Next Unit
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </CourseLayout>
  );
};

export default APStatisticsUnit;">Skills:</span>
                        <span className="ml-2">{topic.skills.join(', ')}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium
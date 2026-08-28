// pipeline {

//     agent any

//     // =========================================================
//     // PARAMETERS
//     // =========================================================
//     parameters {

//         choice(
//             name: 'TEST_FILE',
//             choices: [
//                 'ALL',
//                 'tests/troyGamesProject/login.test.ts',
//                 'tests/troyGamesProject/dashboard.test.ts',
//                 'tests/troyGamesProject/users.test.ts'
//             ],
//             description: 'Select the Playwright test file to execute'
//         )

//         string(
//             name: 'TEST_NAME',
//             defaultValue: '',
//             description: 'Optional: Enter exact/partial Playwright test name. Example: valid login test'
//         )
//     }


//     stages {

//         // =====================================================
//         // 1. CHECKOUT
//         // =====================================================
//         stage('Checkout') {

//             steps {

//                 echo '======================================'
//                 echo 'Checking out code from GitHub...'
//                 echo '======================================'

//                 checkout scm
//             }
//         }


//         // =====================================================
//         // 2. INSTALL DEPENDENCIES
//         // =====================================================
//         stage('Install Dependencies') {

//             steps {

//                 echo '======================================'
//                 echo 'Installing npm dependencies...'
//                 echo '======================================'

//                 bat 'npm ci'
//             }
//         }


//         // =====================================================
//         // 3. INSTALL PLAYWRIGHT
//         // =====================================================
//         stage('Install Playwright Browser') {

//             steps {

//                 echo '======================================'
//                 echo 'Installing Playwright Chromium...'
//                 echo '======================================'

//                 bat 'npx playwright install chromium'
//             }
//         }


//         // =====================================================
//         // 4. DISPLAY TEST SELECTION
//         // =====================================================
//         stage('Test Selection') {

//             steps {

//                 echo '======================================'
//                 echo 'TEST EXECUTION DETAILS'
//                 echo '======================================'

//                 echo "Test File : ${params.TEST_FILE}"
//                 echo "Test Name : ${params.TEST_NAME}"

//                 echo '======================================'
//             }
//         }


//         // =====================================================
//         // 5. RUN PLAYWRIGHT TEST
//         // =====================================================
//         stage('Run Playwright Tests') {

//             steps {

//                 script {

//                     def command = 'npx playwright test'


//                     // -------------------------------------------------
//                     // If a specific test file is selected
//                     // -------------------------------------------------
//                     if (params.TEST_FILE != 'ALL') {

//                         command = "npx playwright test \"${params.TEST_FILE}\""
//                     }


//                     // -------------------------------------------------
//                     // If a specific test name is entered
//                     // -------------------------------------------------
//                     if (params.TEST_NAME?.trim()) {

//                         command = "${command} -g \"${params.TEST_NAME}\""
//                     }


//                     echo '======================================'
//                     echo 'PLAYWRIGHT COMMAND'
//                     echo '======================================'

//                     echo command

//                     echo '======================================'
//                     echo 'Running Playwright tests...'
//                     echo '======================================'


//                     bat command
//                 }
//             }
//         }
//     }


//     // =========================================================
//     // POST ACTIONS
//     // =========================================================
//     post {

//         always {

//             echo '======================================'
//             echo 'Creating Playwright Report ZIP...'
//             echo '======================================'


//             // -------------------------------------------------
//             // Create ZIP even when test fails
//             // -------------------------------------------------
//             bat '''
//                 if exist playwright-report (
//                     powershell -NoProfile -Command "if (Test-Path 'playwright-report.zip') { Remove-Item 'playwright-report.zip' -Force }; Compress-Archive -Path 'playwright-report' -DestinationPath 'playwright-report.zip' -Force"
//                     echo Playwright report ZIP created successfully.
//                 ) else (
//                     echo Playwright report folder not found.
//                 )
//             '''


//             // -------------------------------------------------
//             // Archive HTML report
//             // -------------------------------------------------
//             echo 'Archiving Playwright HTML report...'

//             archiveArtifacts(
//                 artifacts: 'playwright-report/**',
//                 allowEmptyArchive: true,
//                 fingerprint: true
//             )


//             // -------------------------------------------------
//             // Archive ZIP
//             // -------------------------------------------------
//             echo 'Archiving Playwright ZIP report...'

//             archiveArtifacts(
//                 artifacts: 'playwright-report.zip',
//                 allowEmptyArchive: true,
//                 fingerprint: true
//             )


//             // -------------------------------------------------
//             // Send Email
//             // -------------------------------------------------
//             echo 'Sending Playwright report by email...'

//             emailext(

//                 to: 'emanualreeves@gmail.com',

//                 subject: "Playwright Test Result - ${currentBuild.currentResult} - Build #${env.BUILD_NUMBER}",

//                 body: """
//                     <html>

//                     <body>

//                         <h2>🎭 Playwright Automation Report</h2>

//                         <hr>

//                         <h3>Execution Details</h3>

//                         <p>
//                             <b>Project:</b> ${env.JOB_NAME}
//                         </p>

//                         <p>
//                             <b>Build Number:</b> #${env.BUILD_NUMBER}
//                         </p>

//                         <p>
//                             <b>Status:</b> ${currentBuild.currentResult}
//                         </p>

//                         <p>
//                             <b>Test File:</b> ${params.TEST_FILE}
//                         </p>

//                         <p>
//                             <b>Test Name:</b>
//                             ${params.TEST_NAME ?: 'All tests'}
//                         </p>

//                         <hr>

//                         <h3>Jenkins Build</h3>

//                         <p>
//                             <a href="${env.BUILD_URL}">
//                                 Open Jenkins Build #${env.BUILD_NUMBER}
//                             </a>
//                         </p>

//                         <hr>

//                         <p>
//                             The Playwright test execution has completed.
//                         </p>

//                         <p>
//                             The complete Playwright HTML report
//                             is attached as a ZIP file.
//                         </p>

//                         <hr>

//                         <p>
//                             <b>Job:</b> ${env.JOB_NAME}
//                         </p>

//                         <p>
//                             <b>Build:</b> #${env.BUILD_NUMBER}
//                         </p>

//                         <p>
//                             <b>Result:</b> ${currentBuild.currentResult}
//                         </p>

//                     </body>

//                     </html>
//                 """,

//                 mimeType: 'text/html',

//                 attachmentsPattern: 'playwright-report.zip'
//             )
//         }


//         // =====================================================
//         // SUCCESS
//         // =====================================================
//         success {

//             echo ''
//             echo '======================================'
//             echo '✅ PLAYWRIGHT TESTS PASSED'
//             echo '======================================'
//             echo ''
//         }


//         // =====================================================
//         // FAILURE
//         // =====================================================
//         failure {

//             echo ''
//             echo '======================================'
//             echo '❌ PLAYWRIGHT TESTS FAILED'
//             echo '======================================'
//             echo ''
//         }


//         // =====================================================
//         // ABORTED
//         // =====================================================
//         aborted {

//             echo ''
//             echo '======================================'
//             echo '⚠️ PLAYWRIGHT BUILD ABORTED'
//             echo '======================================'
//             echo ''
//         }
//     }
// }

pipeline {

    agent any

    parameters {

        choice(
            name: 'TEST_FILE',
            choices: [
                'ALL',
                'tests/troyGamesProject/login.test.ts'
            ],
            description: 'Select test file'
        )

        string(
            name: 'TEST_NAME',
            defaultValue: '',
            description: 'Enter test name'
        )
    }

    stages {

        stage('Test Parameters') {

            steps {

                echo "TEST FILE = ${params.TEST_FILE}"
                echo "TEST NAME = ${params.TEST_NAME}"
            }
        }
    }
}
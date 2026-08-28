pipeline {

    agent any

    // =========================================================
    // PARAMETERS
    // =========================================================
    parameters {

        choice(
            name: 'TEST_FILE',
            choices: [
                'ALL',
                'tests/troyGamesProject/login.test.ts'
            ],
            description: 'Select Playwright test file'
        )

        string(
            name: 'TEST_NAME',
            defaultValue: '',
            description: 'Enter test name. Example: login test'
        )
    }


    stages {

        // =====================================================
        // 1. CHECKOUT
        // =====================================================
        stage('Checkout') {

            steps {

                echo '======================================'
                echo 'Checking out code from GitHub...'
                echo '======================================'

                checkout scm
            }
        }


        // =====================================================
        // 2. DISPLAY PARAMETERS
        // =====================================================
        stage('Test Parameters') {

            steps {

                echo '======================================'
                echo 'TEST EXECUTION PARAMETERS'
                echo '======================================'

                echo "TEST FILE = ${params.TEST_FILE}"
                echo "TEST NAME = ${params.TEST_NAME}"

                echo '======================================'
            }
        }


        // =====================================================
        // 3. INSTALL DEPENDENCIES
        // =====================================================
        stage('Install Dependencies') {

            steps {

                echo '======================================'
                echo 'Installing npm dependencies...'
                echo '======================================'

                bat 'npm ci'
            }
        }


        // =====================================================
        // 4. INSTALL PLAYWRIGHT
        // =====================================================
        stage('Install Playwright Browser') {

            steps {

                echo '======================================'
                echo 'Installing Playwright Chromium...'
                echo '======================================'

                bat 'npx playwright install chromium'
            }
        }


        // =====================================================
        // 5. RUN PLAYWRIGHT
        // =====================================================
        stage('Run Playwright Tests') {

            steps {

                script {

                    def command = 'npx playwright test'


                    // -----------------------------------------
                    // Specific test file
                    // -----------------------------------------
                    if (params.TEST_FILE != 'ALL') {

                        command =
                            "npx playwright test \"${params.TEST_FILE}\""
                    }


                    // -----------------------------------------
                    // Specific test name
                    // -----------------------------------------
                    if (params.TEST_NAME?.trim()) {

                        command =
                            "${command} -g \"${params.TEST_NAME}\""
                    }


                    echo '======================================'
                    echo 'PLAYWRIGHT EXECUTION'
                    echo '======================================'

                    echo "Command: ${command}"

                    echo '======================================'

                    bat command
                }
            }
        }


        // =====================================================
        // 6. CREATE REPORT ZIP
        // =====================================================
        stage('Create Report ZIP') {

            steps {

                echo '======================================'
                echo 'Creating Playwright Report ZIP...'
                echo '======================================'

                bat '''
                    if exist playwright-report (
                        powershell -NoProfile -Command "if (Test-Path 'playwright-report.zip') { Remove-Item 'playwright-report.zip' -Force }; Compress-Archive -Path 'playwright-report' -DestinationPath 'playwright-report.zip' -Force"

                        echo Playwright report ZIP created successfully.
                    ) else (
                        echo Playwright report folder not found.
                    )
                '''
            }
        }
    }


    // =========================================================
    // POST ACTIONS
    // =========================================================
    post {

        always {

            echo '======================================'
            echo 'POST BUILD ACTIONS'
            echo '======================================'

            echo 'Archiving Playwright HTML report...'

            archiveArtifacts(
                artifacts: 'playwright-report/**',
                allowEmptyArchive: true,
                fingerprint: true
            )


            echo 'Archiving Playwright ZIP report...'

            archiveArtifacts(
                artifacts: 'playwright-report.zip',
                allowEmptyArchive: true,
                fingerprint: true
            )


            // =================================================
            // SEND EMAIL
            // =================================================

            echo 'Sending Playwright report by email...'

            emailext(

                to: 'emanualreeves@gmail.com',

                subject: "Playwright Test Result - ${currentBuild.currentResult} - Build #${env.BUILD_NUMBER}",

                body: """
                    <html>

                    <body>

                        <h2>🎭 Playwright Automation Report</h2>

                        <hr>

                        <h3>Execution Details</h3>

                        <p>
                            <b>Project:</b>
                            ${env.JOB_NAME}
                        </p>

                        <p>
                            <b>Build:</b>
                            #${env.BUILD_NUMBER}
                        </p>

                        <p>
                            <b>Status:</b>
                            ${currentBuild.currentResult}
                        </p>

                        <p>
                            <b>Test File:</b>
                            ${params.TEST_FILE}
                        </p>

                        <p>
                            <b>Test Name:</b>
                            ${params.TEST_NAME ?: 'All tests'}
                        </p>

                        <hr>

                        <h3>Jenkins Build</h3>

                        <p>
                            <a href="${env.BUILD_URL}">
                                Open Jenkins Build
                            </a>
                        </p>

                        <hr>

                        <p>
                            Playwright test execution has completed.
                        </p>

                        <p>
                            The Playwright HTML report is attached
                            as a ZIP file.
                        </p>

                        <hr>

                        <p>
                            <b>Jenkins Job:</b>
                            ${env.JOB_NAME}
                        </p>

                        <p>
                            <b>Build Number:</b>
                            #${env.BUILD_NUMBER}
                        </p>

                    </body>

                    </html>
                """,

                mimeType: 'text/html',

                attachmentsPattern: 'playwright-report.zip'
            )
        }


        // =====================================================
        // SUCCESS
        // =====================================================
        success {

            echo ''
            echo '======================================'
            echo '✅ PLAYWRIGHT TESTS PASSED'
            echo '======================================'
            echo ''
        }


        // =====================================================
        // FAILURE
        // =====================================================
        failure {

            echo ''
            echo '======================================'
            echo '❌ PLAYWRIGHT TESTS FAILED'
            echo '======================================'
            echo ''
        }


        // =====================================================
        // ABORTED
        // =====================================================
        aborted {

            echo ''
            echo '======================================'
            echo '⚠️ PLAYWRIGHT BUILD ABORTED'
            echo '======================================'
            echo ''
        }
    }
}
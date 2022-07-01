/**
 * List of log level patterns that we need to do the destruction based on
 */
export enum LogParserPatterns{
    /**
     * a pattern to finde the matched level inside the log
     */
    LOG_LEVEL='\\s-\\s\\w+\\s-\\s',
    /**
     * a pattern to finde the matched time stamp inside the log
     */
    TIME_STAMP='[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}[A-Z][0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}.[0-9]{1,3}[A-Z]',
    /**
     * a pattern to finde the matched log info json inside the log
     */
    LOG_INFO='{(?:)(.*)}'


}
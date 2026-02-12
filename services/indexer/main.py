import logging
import time
import signal
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

class Indexer:
    def __init__(self):
        self.running = True
        signal.signal(signal.SIGINT, self._handle_shutdown)
        signal.signal(signal.SIGTERM, self._handle_shutdown)

    def _handle_shutdown(self, signum, frame):
        logger.info("Shutdown signal received, cleaning up...")
        self.running = False
        sys.exit(0)

    def start(self):
        logger.info("Indexer service started")
        try:
            while self.running:
                # TODO: Add indexing logic here
                time.sleep(5)
                logger.debug("Indexer running...")
        except Exception as e:
            logger.error(f"Error in indexer: {e}", exc_info=True)
        finally:
            logger.info("Indexer service stopped")

if __name__ == "__main__":
    indexer = Indexer()
    indexer.start()

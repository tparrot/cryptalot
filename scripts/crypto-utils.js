async function processChunksIncrementally(data, processFn, onChunkProcessed) {
    const chunkSize = 64 * 1024; // 64 KB
    for (let i = 0; i < data.byteLength; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        const processedChunk = await processFn(chunk); // Process each chunk sequentially
        if (onChunkProcessed) {
            onChunkProcessed(new Uint8Array(processedChunk)); // Pass processed chunk to callback
        }
    }
}

function mergeChunksIncrementally(chunks, onChunkMerged) {
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.byteLength, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        combined.set(chunk, offset);
        offset += chunk.byteLength;
        if (onChunkMerged) {
            onChunkMerged(chunk); // Notify callback for each merged chunk
        }
    }
    return combined;
}

// Expose the functions globally
window.processChunksIncrementally = processChunksIncrementally;
window.mergeChunksIncrementally = mergeChunksIncrementally;

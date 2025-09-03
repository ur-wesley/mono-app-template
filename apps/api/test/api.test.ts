// test/api.test.ts
import { describe, expect, it } from 'bun:test'
import { apiRoutes } from '../src/routes/api'

describe('API Routes', () => {
    it('returns hello response without name', async () => {
        const response = await apiRoutes
            .handle(new Request('http://localhost/api/hello'))
            .then((res) => res.json())

        expect(response).toHaveProperty('message')
        expect(response.message).toBe('Hello world')
    })

    it('returns hello response with name', async () => {
        const response = await apiRoutes
            .handle(new Request('http://localhost/api/hello?name=John'))
            .then((res) => res.json())

        expect(response).toHaveProperty('message')
        expect(response.message).toBe('Hello John')
    })

    it('returns echo response', async () => {
        const testData = { text: 'test message' }
        
        const response = await apiRoutes
            .handle(new Request('http://localhost/api/echo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testData)
            }))
            .then((res) => res.json())

        expect(response).toHaveProperty('echo')
        expect(response.echo).toBe(testData.text)
    })

    it('handles missing echo data', async () => {
        const response = await apiRoutes
            .handle(new Request('http://localhost/api/echo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: '' })
            }))

        expect(response.status).toBe(400)
        
        const data = await response.json()
        expect(data).toHaveProperty('message')
        expect(data.message).toBe('text must not be empty')
    })
})

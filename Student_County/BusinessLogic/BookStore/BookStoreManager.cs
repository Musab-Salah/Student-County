﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.DAL;
using System.Security.Claims;

namespace Student_County.BusinessLogic.BookStore
{
    public class BookStoreManager : IBookStoreManager
    {
        protected readonly StudentCountyContext _context;

        public BookStoreManager(StudentCountyContext context)
        {
            _context = context;

        }
        public async Task<List<BookStoreEntity>> GetAll() => await _context.Books.Where(entity => !entity.IsDeleted).ToListAsync();

        public async Task<List<BookStoreEntity>> GetMyAllBooks(string userid) => await _context.Books.Where(entity => !entity.IsDeleted && entity.StudentId == userid).ToListAsync();

        public async Task Delete(int id)
        {
            var entity = await _context.Books.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("BookStore Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
            }          
        }
        public async Task<BookStoreEntity> GetBookStore(int id)
        {
            var entity = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("BookStore Not Found");
            else if (entity.IsDeleted)
                throw new Exception("BookStore Is Deleted");
            return entity;
        }
        public async Task<BookStoreEntity> CreateUpdate(BookStoreBo bo, string userName, int id = 0)
        {
            var entity = bo.MapBoToEntity();
            if (id == 0)
            {
                entity.CreatedBy = userName;
                _context.Add(entity);
            }
            else if (id != 0)
            {
                entity.ModifiedBy=userName;
                entity.ModifiedOn = DateTime.UtcNow;
                _context.Update(entity);
            }
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
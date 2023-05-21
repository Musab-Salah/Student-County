﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.DAL;
using System.Security.Claims;

namespace Student_County.BusinessLogic.Book
{
    public class BookManager : IBookManager
    {
        protected readonly StudentCountyContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public BookManager(StudentCountyContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;


        }
        public async Task<List<BookEntity>> GetAll() => await _context.Books.Where(entity => !entity.IsDeleted).ToListAsync();

        public async Task<List<BookEntity>> GetMyAllBooks(string userid) => await _context.Books.Where(entity => !entity.IsDeleted && entity.StudentId == userid).ToListAsync();

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
        public async Task<BookEntity> GetBookStore(int id)
        {
            var entity = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("BookStore Not Found");
            else if (entity.IsDeleted)
                throw new Exception("BookStore Is Deleted");
            return entity;
        }
        public async Task<BookEntity> CreateUpdate(BookBo bo, int id = 0)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == bo.StudentId); 
            var entity = bo.MapBoToEntity();
            entity.StudentName = user.FirstName + " " + user.LastName;

            if (id == 0)
            {
                entity.CreatedBy = user.UserName;
                _context.Add(entity);
            }
            else if (id != 0)
            {
                entity.ModifiedBy= user.UserName;
                entity.ModifiedOn = DateTime.UtcNow;
                _context.Update(entity);
            }
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}